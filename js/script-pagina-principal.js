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

import { color } from "../js/funciones.js";
import { defaultValue } from "../js/funciones.js";
import { crearBarraFiltros } from "../js/funciones.js";

// Funciones para generar filtros
let filtros = [
  {
    input: "barraDesnivelMin",
    min: 0,
    max: 20000,
    text: "Desnivel Minimo : ",
    parrafo: "desnivelMin",
  },

  {
    input: "barraDesnivelMax",
    min: 0,
    max: 20000,
    text: "Desnivel Máximo : ",
    parrafo: "desnivelMax",
  },

  {
    input: "barraDistanciaMin",
    min: 0,
    max: 20000,
    text: "Distancia Mínima : ",
    parrafo: "distanciaMin",
  },

  {
    input: "barraDistanciaMax",
    min: 0,
    max: 20000,
    text: "Distancia Máxima : ",
    parrafo: "distanciaMax",
  },
];

filtros.forEach((filtro) => {
  let divFiltro = document.createElement("div");
  divFiltro.innerHTML = `

                <div>
                  <p class= "filtroText" id='${filtro.parrafo}'>${
    filtro.text
  } </p>
                </div>
                <span>
                  <input
                    id="${filtro.input}"
                    type="range"
                    min="${filtro.min}"
                    max="${filtro.max}"
                    value= ${defaultValue(filtro.input)}
                  />
                </span>

  `;
  divFiltro.classList.add("boxfilters");
  document.querySelector(".filtros").append(divFiltro);

  // Obtener elementos globales, fuera de la función
});

crearBarraFiltros();
var markers = [];

let markersadded = false;

let map = L.map("map").setView([42.45631, -6.767175], 13);
L.tileLayer(
  "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0cac68bc84e4402b90c586f8997f0ed2",
  {
    maxZoom: 8,
    attribution:
      '&copy; <a href="https://www.thunderforest.com/terms/">ThunderForest</a>',
  }
).addTo(map);

document
  .querySelector("#mostrarFiltros")
  .addEventListener("click", mostrarFiltros);
function mostrarFiltros(e) {
  e.preventDefault();
  document.querySelector(".filtros").style.display = "block";
}

document.querySelector("#closeBtn").addEventListener("click", () => {
  document.querySelector(".filtros").style.display = "none";
});

//función para filtrar por peticiones desde el index:
// let nombreRuta = "";
// if (localStorage.getItem('destino')){
//     nombreRuta = localStorage.getItem('destino');
// }else{
//   nombreRuta = document.querySelector("#buscadorInput").value;
// }
document.querySelector("#buscadorInput").addEventListener("keyup", filtrar);

window.addEventListener("load", filtrar);
document.querySelector("#circular").addEventListener("change", filtrar);
document.querySelector("#intensidad").addEventListener("change", filtrar);
barraDesnivelMin.addEventListener("change", filtrar);
barraDesnivelMax.addEventListener("change", filtrar);
barraDistanciaMin.addEventListener("change", filtrar);
barraDistanciaMax.addEventListener("change", filtrar);

function filtrar() {
  if (markersadded) {
    console.log(`borrando`);
    markers.forEach((marker) => {
      marker.remove();
    });
  }
  markers = [];

  document.querySelector(".col-izq").innerHTML = "";

  let nombreRuta = document.querySelector("#buscadorInput").value;
  let circular = document.querySelector("#circular").value;
  let dif = document.querySelector("#intensidad").value;
  let minSlope = barraDesnivelMin.value;
  let maxSlope = barraDesnivelMax.value;
  let maxDist = barraDistanciaMax.value;
  let minDist = barraDistanciaMin.value;

  let url = `api/routes?&`;

  if (nombreRuta) {
    url += `route_name=${nombreRuta}`;
  }
  if (dif) {
    url += `dif=${dif}`;
  }

  if (circular) {
    url += `circular=${circular}`;
  }

  // &min_dist=${minDist}&max_dist=${maxDist}&min_slope=${minSlope}&max_slope=${maxSlope}

  fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          console.log("Busqueda exitosa");
          console.log(url);
          break;
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((dato) => {

        console.log(dato);
        //Agregar cada tarjeta de ruta con cada uno de los datos de las rutas
        let div = document.createElement("div");
        let dificultad = "";
        switch (dato.dif) {
          case '0':
            dificultad = "Facil";
            break;
          case '1':
            dificultad = "Moderado";
            break;
          case '2':
            dificultad = "Difícil";
            break;
          case '3':
            dificultad = "Muy difícil";
            break;
          case '4':
            dificultad = "Expertos";
            break;
        }
        let idruta = dato.id;
        
        
        div.innerHTML += `         
  <div class="leftside">
    <div class="titulo">
    
    <a href="pagina-detalle-rutas.php?idruta=${idruta}">${dato.route_name}</a> 
 </div>
    <div class="imagen">
      <img
        class="icono-walker"
        src="img/img-principal/walker.png"
        alt=""
      />
    </div>
  </div>
  <div class="rightside">
    <div class="favorito">
      <img
        class="icono-fav"
        src="img/img-principal/fav.png"
        alt="favorito"
      />
    </div>
    <div class="detalles">
    <div class="nivel ${color(`${dificultad}`)}">${dificultad}</div>
  
      <div class="iconoyspan">
        <div class="fila">
          <span
            >${dato.distance} kms<img
              class="icono-distancia"
              src="img/img-principal/distance.png"
              alt="distancia"
          /></span>
  
          <span
            >${dato.max_height} mt<img
              class="altura-up"
              src="img/img-principal/altitudarriba.png"
              alt="altura_alta"
          /></span>
        </div>
  
        <div class="fila">
          <span
            >6:30 h<img
              class="icono-tiempo"
              src="img/img-principal/icontime.png"
              alt="tiempo"
          /></span>
  
          <span
            >${dato.min_height} mt<img
              class="altura-down"
              src="img/img-principal/altitudarriba.png"
              alt="altura_baja"
          /></span>
        </div>
  
        <div class="fila">
          <span
            >${dato.user}<img
              class="icono-avatar"
              src="img/img-principal/avatar.png"
              alt="avatar"
          /></span>
        </div>
      </div>
    </div>
  </div>`;

        div.classList.add("tarjeta");
        document.querySelector(".col-izq").append(div);

        markers.push(
          L.marker([dato.start_lat, dato.start_lon], {
            title: dato.route_name,
            opacity: 0.7,
            draggable: true,
          })
            .addTo(map)
            .bindPopup(dato.route_name)
            .openPopup()
        );

        console.log(markers);

        // marker.bindPopup("<img src=./>").openPopup();
        // let circle = L.circle([dato.start_lat, dato.start_lon], {
        //   radius: 10000,
        //   color: "yellow",
        //   fillColor: "green",
        // }).addTo(map);
      });

      markersadded = true;
      console.log(`markers añadidos: ${markers.length}`);
    });
}
