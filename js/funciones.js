// Función para incluir menu y footer en todas las páginas
function fetchHTML(url, a) {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        a.innerHTML = text;
        resolve();
      });
  });
  return promise;
}
export { fetchHTML };

function dimensionarIcono() {
  let src = "";
  if (window.innerWidth < 1024) {
    if (
      window.location.pathname == "/pagina-registro.html" ||
      window.location.pathname == "/pagina-perfil-usuario.html" ||
      window.location.pathname == "/pagina-misrutas.html"
    ) {
      src = `"https://cdn.lordicon.com/bhfjfgqz.json" colors="primary:#f121331"`;
    } else {
      src = `"https://cdn.lordicon.com/bhfjfgqz.json" colors="primary:#ffffff`;
    }

    document.querySelector(".iniciar-sesion").innerHTML = `<lord-icon
        src= ${src}
        trigger="hover"  
        style="width:45px;height:45px;">
      </lord-icon>`;
  } else {
    document.querySelector(".iniciar-sesion").innerHTML = "Iniciar Sesión";
  }
}

export { dimensionarIcono };

function color(color) {
  let background = "";
  switch (color) {
    case "Facil":
      background = "green";
      break;
    case "Moderado":
      background = "yellow";
      break;
    case "Difícil":
      background = "orange";
      break;
    case "Muy difícil":
      background = "tomato";
      break;
    case "Expertos":
      background = "red";
      break;
  }

  return background;
}
export { color };

//funcion apra pagina mis rutas y pagina principal, para que el value inicial de las barras no sea 0
function defaultValue(input) {
  let value = 0;
  return input == "barraDesnivelMax" || input == "barraDistanciaMax"
    ? (value = "20000")
    : 0;
}

export { defaultValue };

function crearBarraFiltros() {
  let barraDesnivelMin = document.getElementById(`barraDesnivelMin`);
  let barraDesnivelMax = document.getElementById(`barraDesnivelMax`);
  let barraDistanciaMin = document.getElementById(`barraDistanciaMin`);
  let barraDistanciaMax = document.getElementById(`barraDistanciaMax`);

  //Desnivel Minima
  document
    .getElementById(`barraDesnivelMin`)
    .addEventListener("input", mostrardesnivelMin);
  function mostrardesnivelMin() {
    document.getElementById(
      `desnivelMin`
    ).innerHTML = `Desnivel mínimo : ${barraDesnivelMin.value}`;
  }

  //Altitud Máxima
  document
    .getElementById(`barraDesnivelMax`)
    .addEventListener("input", mostrardesnivelMax);
  function mostrardesnivelMax() {
    document.getElementById(
      `desnivelMax`
    ).innerHTML = `Desnivel max : ${barraDesnivelMax.value}`;
  }
  //Distancia Minima
  document
    .getElementById(`barraDistanciaMin`)
    .addEventListener("input", mostrardistanciaMin);
  function mostrardistanciaMin() {
    document.getElementById(
      `distanciaMin`
    ).innerHTML = `Distancia min : ${barraDistanciaMin.value}`;
  }

  //Distancia Maxima
  document
    .getElementById(`barraDistanciaMax`)
    .addEventListener("input", mostrardistanciaMax);
  function mostrardistanciaMax() {
    document.getElementById(
      `distanciaMax`
    ).innerHTML = `Distancia max: ${barraDistanciaMax.value}`;
  }
}

export { crearBarraFiltros };


const expresiones = {
  email: /[a-z0-9\._-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/,
  username: /^[a-zA-Z0-9_]{4,}$/,
  password: /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})$/,
};


// function revisarMail() {
//   if (!expresiones.email.test(email.value)) {
//     infoEmail.innerHTML = `<p>*Correo electrónico no valido</p>`;
//     infoEmail.classList.add("error");
//   } else {
//     infoEmail.innerHTML = "";
//   }
// }
// export { revisarMail };