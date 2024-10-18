import { personIcon } from "./constants.js";
import ui from "./ui.js";
import getIcon, { getStatus } from "./helpers.js";

/**Global Değişken */
//Haritadaki tıklanan son konum
let map;
let clickedCoords;
let layer;
let notes = JSON.parse(localStorage.getItem("notes")) || [];

console.log(notes);

/**
 ** Kullanıcıya konumunu paylaşmak istediğini soracağız:
 ** 1-) Paylaşırsa haritayı kullanıcının konumuna göre ayarlayacağız
 ** 2-) Paylaşmazsa haritayı Ankara'ya ayarlayacağız.
 */
window.navigator.geolocation.getCurrentPosition(
  (e) => {
    loadMap([e.coords.latitude, e.coords.longitude], "Mevut Konum");
  },
  () => {
    loadMap([40.7535616, 30.425088], "Varsayılan Konum");
  }
);
/**Haritayı Yükler: */
function loadMap(currentPosition, msg) {
  //* 1) Harita Kurulum / Merkez Belirleme
  map = L.map("map", {
    zoomControl: false,
  }).setView(currentPosition, 8);

  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(map);

  /** 2) Haritatı ekrana basar */
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  /**HARİTANIN ÜZERİNE İMLEÇLERİ EKLEYECEĞİMİZ BİR KATMAN OLUŞTUR. */
  layer = L.layerGroup().addTo(map);

  /** 3) İmleç ile işaretleme */
  L.marker(currentPosition, { icon: personIcon }).addTo(map).bindPopup(msg);

  //4) Haritada tıklanma olaylarını izle
  map.on("click", onMapClick);

  //*5) Ekrana daha önce eklenen notları bas
  renderNotes();
  renderMakers();
}

//* Haritaya Tıklanma olayında:
function onMapClick(e) {
  //*Tıklanan konumunun koordinatlarını global değişkene aktar
  clickedCoords = [e.latlng.lat, e.latlng.lng];

  //* aside elementine add class'ını ekle
  ui.aside.className = "add";
}

/**İptal butonuna tıklanınca */
ui.cancelBtn.addEventListener("click", () => {
  /**Aside elementinden add class'ını kaldır */
  ui.aside.className = "";
});

/**Form Gönderilince */
ui.form.addEventListener("submit", (e) => {
  /**Sayfa yenilenmesini engelle */
  e.preventDefault();

  /**İnputlardaki verilere eriş */
  const title = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;

  /**Yeni bir nesne oluştur */
  const newNote = {
    id: new Date().getTime(),
    title,
    date,
    status,
    coords: clickedCoords,
  };

  //*nesneyi global değişkene kaydet
  notes.unshift(newNote);

  /**LocalStorage'ı güncelle: */
  localStorage.setItem("notes", JSON.stringify(notes));

  /**Aside alanından "add" classını kaldır */
  ui.aside.className = "";

  /**Formu Temizle */
  e.target.reset();

  /**Yeni notun ekrana gelmesi için notları tekrardan renderle */
  renderNotes();
  renderMakers();
});

/**Ekrana imleçleri bas*/
function renderMakers() {
  /**Eski imleçleri kaldır(katmandaki markerları temizle) */
  layer.clearLayers();

  notes.forEach((item) => {
    /**Item'ın statusüne göre icon koyma */
    const icon = getIcon(item.status);

    L.marker(item.coords, { icon: icon }) /**imleci oluştur */
      .addTo(layer) /**imleçler katmanına ekle */
      .bindPopup(item.title); /**imlece başlık ekle */
  });
}

/**Ekrana Notları Bas */
function renderNotes() {
  const noteCards = notes
    .map((item) => {
      //*tarihi kullanıcı dostu formata çevir
      const date = new Date(item.date).toLocaleDateString("tr", {
        day: "2-digit",
        month: "long",
        year: "2-digit",
      });
      //*Status değerini çevir
      const status = getStatus(item.status);

      //* oluşturulacak note'un html içeriğini belirle
      return `
          <li>
            <div>
              <p>${item.title}</p>
              <p>${date}</p>
              <p>${status}</p>
            </div>

            <div class="icons">
              <i data-id="${item.id}" class="bi bi-airplane-fill" id="fly"></i>

              <i data-id="${item.id}" class="bi bi-trash3-fill" id="delete"></i>
            </div>
          </li>

      `;
    })
    .join("");

  //*Note^ları liste alanında renderla
  ui.list.innerHTML = noteCards;

  /**Ekrandaki delete id'li iconları al ve tıklanma olaylarında silme fonksiyonunu çağır.*/
  document.querySelectorAll("li #delete").forEach((btn) => {
    btn.addEventListener("click", () => deleteNote(btn.dataset.id));
  });

  /**Fly iconlarını al ve tıklanınca uçuş fonksiyonunu çağır */
  document.querySelectorAll("li #fly").forEach((btn) => {
    btn.addEventListener("click", () => flyToLocation(btn.dataset.id));
  });
}

/**Silme butonuna tıklanınca */
function deleteNote(id) {
  const res = confirm(" Silme işlemini onaylıyor musunuz ? ");

  /**Onaylarsa sil */
  if (res) {
    /**İd'sini bildiğimiz elemanı diziden kaldır*/
    notes = notes.filter((note) => note.id !== +id);

    /**LocalStorage güncelle */
    localStorage.setItem("notes", JSON.stringify(notes));

    /**güncel notları ekrana bas */
    renderNotes();

    /**güncel imleçleri ekrana bas */
    renderMakers();
  }
}

/**Uçuş butonuna tıklanınca */
function flyToLocation(id) {
  /**Id'si bilinen elemanı dizide bul */
  const note = notes.find((note) => note.id === +id);

  /**Note'un koordinatlarına uç */
  map.flyTo(note.coords, 10);
}

/** Tıklanma Olayında */
/** Aside alanındaki form veya liste içeriğini gizlemek için hide class'ı ekle */
ui.arrow.addEventListener("click", () => {
  ui.aside.classList.toggle("hide");
});
