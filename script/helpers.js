import { gotoIcon, homeIcon, jobIcon, parkIcon } from "./constants.js";

/**Status değerine bağlı olarak dinamik doğru icon'u return eden fonksiyon */

function getIcon(status) {
  switch (status) {
    case "goto":
      return gotoIcon;
    case "home":
      return homeIcon;
    case "job":
      return jobIcon;
    case "park":
      return parkIcon;

    default:
      return undefined;
  }
}

export default getIcon;

//*Status değerinin türkçe karşılığını return eden fonksiyon
export function getStatus(status) {
  switch (status) {
    case "goto":
      return "Ziyaret";
    case "home":
      return "Evim";
    case "job":
      return "İşim";
    case "park":
      return "Araba Burada";
    default:
      return "Öylesine";
  }
}
