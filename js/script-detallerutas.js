//Importando menu y Footer
let menu = document.querySelector(".menu");
import { fetchHTML } from "../js/funciones.js";
import { reloadScript } from "./script-header.js";
// fetch
fetchHTML("plantillas/header.html", menu).then(() => {
  //importar footer
  let footer = document.querySelector(".footer");
  fetchHTML("plantillas/footer.html", footer);
  reloadScript();
});
window.addEventListener("resize", dimensionarIcono);
import { dimensionarIcono } from "../js/funciones.js";

// import { color } from "../js/funciones.js";

//  let map = L.map("map").setView([42.60003, -5.57032], 13);

//  L.tileLayer(
//    "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0cac68bc84e4402b90c586f8997f0ed2",
//    {

//      maxZoom: 8,
//     attribution:
//      '&copy; <a href="https://www.thunderforest.com/terms/">ThunderForest</a>',
//   }
//  ).addTo(map);


// let idruta = "";

//  let url = `http://localhost:5000/api/routes/?id=${idruta}`;

//   fetch(`${url}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       switch (response.status) {
//         case 200:
//           console.log("Busqueda exitosa");
//           console.log(url);
//           break;
//       }
//       return response.json();
//     })
//     .then((data) => {

//       //crear markador con los puntos

//     });

// var marker = L.marker([42.60003, -5.57032], {
//   title: "Mi marcador",
//   opacity: 0.7,
//   draggable: true,
//   riseOnHover: true,
// }).addTo(map);

// //open popup para q este abierto por defecto
// marker.bindPopup("<img src=./>").openPopup();

// let circle = L.circle([42.60003, -5.57032], {
//   radius: 1000,
//   color: "yellow",
//   fillColor: "green",
// }).addTo(map);

// var latlngs = [
//   [45.51, -122.68],
//   [37.77, -122.43],
//   [34.04, -118.2],
// ];

// var polyline = L.polyline(latlngs, {
//   color: "blue",
//   weight: 10,
// }).addTo(map);
// map.fitBounds(polyline.getBounds());
