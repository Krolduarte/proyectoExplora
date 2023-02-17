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

//importando funcion para cambiar colores en las tarjetas segun el nivel de dificultad.
import { color } from "../js/funciones.js";
import { defaultValue } from "../js/funciones.js";
import { crearBarraFiltros } from "../js/funciones.js";

// para filtros
let filtros = [
  {
    input: "barraDesnivelMin",
    min: 0,
    max: 2000,
    text: "Desnivel Minimo : ",
    parrafo: "desnivelMin",
  },

  {
    input: "barraDesnivelMax",
    min: 0,
    max: 6000,
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
                  <p class= "filtroText" id='${filtro.parrafo}'>${filtro.text} </p>
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
  divFiltro.classList.add('boxfilters')
  document.querySelector(".filtros").append(divFiltro);

  // Obtener elementos globales, fuera de la función
});

let btnFiltrar = document.createElement('div');
btnFiltrar.innerHTML= `<button value="Filtrar" class="btnFiltrar">Filtrar</button>`;
document.querySelector(".filtros").append(btnFiltrar);
window.addEventListener("load", filtrar);

crearBarraFiltros();

 window.addEventListener('load', filtrar);
document.querySelector("#circular").addEventListener("change", filtrar);
document.querySelector("#intensidad").addEventListener("change", filtrar);
barraDesnivelMin.addEventListener("change", filtrar);
barraDesnivelMax.addEventListener("change", filtrar);
barraDistanciaMin.addEventListener("change", filtrar);
barraDistanciaMax.addEventListener("change", filtrar);

let url = `api/routes?&`;

function filtrar(e) {
  console.log("filtrando");
  document.querySelector(".tarjetas").innerHTML = "";

  let circular = document.querySelector("#circular").value;
  let dif = document.querySelector("#intensidad").value;
  
    let minSlope = barraDesnivelMin.value;
    let maxSlope = barraDesnivelMax.value;
    let maxDist = barraDistanciaMax.value;
    let minDist = barraDistanciaMin.value;
    let userid = sessionStorage.getItem('id');
   let nombreUsuario = sessionStorage.getItem('usuario');
   document.querySelector(".profileName").innerHTML = nombreUsuario;



  if (dif) {
    url += `dif=${dif}`;
  }

  if (circular) {
    url += `circular=${circular}`;
  }

    if (userid) {
    url += `user=${userid}`;
  }

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
        let tcx = dato.tcx;
        div.innerHTML = `

          <div class="tarjeta">
  <div class="leftside">
    <div class="titulo"> <a href="pagina-detalle-rutas.php?idruta=${idruta}&tcx=${tcx}">${dato.route_name}</a> </div>
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
            >${sessionStorage.getItem('usuario')}<img
              class="icono-avatar"
              src="img/img-principal/avatar.png"
              alt="avatar"
          /></span>
        </div>
      </div>
    </div>
  </div>
  </div>`;
        document.querySelector(".tarjetas").append(div);

      });
    });
}



















