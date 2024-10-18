# NOTE-MAP-WORK
<h6>Note Map
Note Map projesi, kullanıcıların harita üzerinde notlar oluşturup bunları yönetebildiği, kullanıcı dostu bir harita tabanlı uygulamadır. Proje, JavaScript ve Leaflet kütüphanesi kullanılarak geliştirilmiştir. Ayrıca, harita üzerinde etkileşimli işlemler ve not yönetimi sağlamak amacıyla LocalStorage kullanılmıştır.

Kullanılan Teknolojiler
JavaScript: Tüm uygulamanın işleyişi JavaScript ile sağlanmıştır.
Leaflet: Harita üzerinde işlemler yapmak için kullanılmıştır.
LocalStorage: Kullanıcı notlarını saklamak ve yönetmek için kullanılmıştır.
Özellikler
1. Kullanıcı Karşılama
Kullanıcıdan, konumunu paylaşması istenir. Eğer izin verirse, haritanın merkezi kullanıcının mevcut konumuna ayarlanır ve konum imleç ile gösterilir. İzin verilmediği durumda ise varsayılan merkez Ankara olarak ayarlanır.

2. Not Oluşturma
Kullanıcı, harita üzerinde herhangi bir yere tıkladığında bir form açılır.
Bu form aracılığıyla not başlığı, tarih ve durumu gibi bilgiler girilir.
Not oluşturulduktan sonra bilgiler LocalStorage'a kaydedilir ve ekranda ilgili konuma bir imleç eklenir.
3. Sidebar ve Not Kartları
Not kartları sidebar üzerinde listelenir. Sidebar, açılır-kapanır yapıda olacak şekilde tasarlanmıştır.
Her bir not kartında iki ikon bulunur: Silme ve uçuş ikonu.
Silme butonu ile ilgili not LocalStorage'dan silinir.
Uçak butonu ile notun harita üzerindeki konumu gösterilir ve harita o noktaya odaklanır.
</h6>

<h5>Gif Dosyası Eklendi<h5>

![](tanıtım.gif)