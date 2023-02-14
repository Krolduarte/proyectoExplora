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
//fin de fetch

//Importar funcion para redimensionar el icono de inicio de sesión
window.addEventListener("resize", dimensionarIcono);
import { dimensionarIcono } from "../js/funciones.js";


let form = document.querySelector("#formulario");
let pwdRepeatInput = document.getElementById("pwd-repeat");
let nombre = document.querySelector("#nombre");
let apellidos = document.querySelector("#apellidos");
let email = document.querySelector("#email");
let usuario = document.querySelector("#usuario");
let contrasena = document.getElementById("pwd");
let estatura = document.querySelector("#estatura");
let peso = document.querySelector("#peso");
let fecha = document.querySelector("#fecha");
let divInfo = document.querySelector(".info");


const expresiones = {
  email: /[a-z0-9\._-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/,
  username: /^[a-zA-Z0-9_]{4,}$/,
  password: /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,8})$/,
};

// ###############################################
// VALIDANDO CORREO ELECTRONICO
// ###############################################

email.addEventListener("input", revisarMail);
let infoEmail = document.querySelector(".infoemail");

function revisarMail() {
  if (!expresiones.email.test(email.value)) {
    infoEmail.innerHTML = `<p>*Correo electrónico no valido</p>`;
    infoEmail.classList.add("error");
  } else {
    infoEmail.innerHTML = "";
  }
}

// ###############################################
// VALIDANDO PATRON DE USUARIO
// ###############################################
let infoUser = document.querySelector(".infouser");
usuario.addEventListener("change", checkPattern);

function checkPattern() {
  if (!expresiones.username.test(usuario.value)) {
    infoUser.innerHTML = `<p>*Ingrese un nombre de usuario valido, mínimo 4 caracteres</p>`;
    infoUser.classList.add("error");
  }else{
     usuario.addEventListener("change", checkUser);
  }
}

function checkUser() {
  fetch(`http://localhost/dwes/proyectoIntegrador/api/checkuser?username=${usuario.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    req: JSON.stringify(usuario.value),
  })
    .then((response) => {
      console.log(response);
      switch (response.status) {
        case 200:
          infoUser.innerHTML = `<lord-icon
          src="https://cdn.lordicon.com/egiwmiit.json"
          trigger="loop"
          delay="2000"
          style="width:32px;height:32px">
      </lord-icon>`;

          break;
        case 400:
          infoUser.innerHTML = `<p>*Nombre existente.</p>`;
          infoUser.classList.add("error");
          break;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

//Funciones para contraseña y repetir contraseña
let infopwd = document.querySelector(".infopwd");
pwdRepeatInput.onblur = function () {
  if (pwdRepeatInput.value != contrasena.value) {
    infopwd.innerHTML =
      "*La contraseña ingresada es distinta, ingrese la misma contraseña";
    pwdRepeatInput.classList.add("invalid");
    pwdRepeatInput.classList.add("error");
    infopwd.classList.add("error");
  }
};

pwdRepeatInput.onfocus = function () {
  if (this.classList.contains("invalid")) {
    this.classList.remove("invalid");
    this.classList.remove("error");
    infopwd.innerHTML = "";
  }
};

//Seguridad de la contraseña (muy débil, débil, aceptable, fuerte, muy segura).
let infoSecurity = document.querySelector(".infosecurity");
contrasena.addEventListener("input", checkSecurity);

function checkSecurity(e) {
  let pass = e.target.value;

  let security = 0;
  let numDigits = 0;
  let numMinus = 0;
  let numMayus = 0;
  let numSimb = 0;

  let abc = "abcdefghijklmnopqrstuvwxyz";

  pass.split("").forEach((car) => {
    numDigits += "0123456789".includes(car) ? 1 : 0;
    numMinus += abc.includes(car) ? 1 : 0;
    numMayus += abc.toUpperCase().includes(car) ? 1 : 0;
  });
  numSimb = pass.length - (numDigits + numMinus + numMayus);

  //longitud
  security += Math.floor(pass.length / 3);
  security += numDigits > 0 ? 1 : 0;
  security += numMinus > 0 ? 1 : 0;
  security += numMayus > 0 ? 1 : 0;
  security += numSimb > 0 ? 1 : 0;

  //Funcion que revise la seguridad en cuanto al contenido de digitos, mayusculas, minusculas y simbolos

  if (security > 0 && security < 4) {
    infoSecurity.innerHTML =
      "Contraseña muy debil, usa al menos un número, una mayúscula y un simbolo";
    infoSecurity.style.color = "purple";
  }
  if (security == 5) {
    infoSecurity.innerHTML =
      "Contraseña debil,usa al menos un número, una mayúscula y un simbolo";
    infoSecurity.style.color = "red";
  }

  if (security == 6) {
    infoSecurity.innerHTML = "Contraseña aceptable";
    infoSecurity.style.color = "orange";
  }

  if (security == 7) {
    infoSecurity.innerHTML = "Contraseña fuerte";
    infoSecurity.style.color = "yellowgreen";
  }

  if (security >= 8) {
    infoSecurity.innerHTML = "Contraseña muy segura";
    infoSecurity.style.color = "green";
  }

  if (security >= 6 && pass.length >=8){

  }
  //  console.log(`Password" ${pass} `);
  //  console.log(`Security ${security}`);
}

//revisando estatura
//entre 100 y 252
let epf = document.querySelector(".epf");
estatura.addEventListener("blur", checkHeight);
peso.addEventListener("blur", checkWeight);

// estatura.oninvalid = function(event) {
//   event.target.setCustomValidity('Estatura debe ser en cms');
// }

function checkHeight(e) {
  // console.log(e.target.value);
  if (e.target.value < 100 || e.target.value > 250) {
    epf.innerHTML = "<p>*Ingrese una estatura válida en metros</p>";
    epf.classList.add("error");
  } else {
  
    epf.innerHTML = "";
  }
}

//revisando peso
function checkWeight(e) {
  // console.log(e.target.value);
  if (e.target.value < 40) {
    epf.innerHTML += "<p>*Ingrese un peso válido en kilogramos</p>";
    epf.classList.add("error");
  } else {
    epf.innerHTML = "";
   
  }
}

// peso.oninvalid = function (event) {
//   event.target.setCustomValidity("Ingrese su peso");
// };

peso.blur = function () {
  console.log(peso.value);
  if (peso.value < 100) {
    epf.innerHTML = "<p>Ingrese su peso en kilogramos</p>";
  }
};

// Revisando Fecha  tipo: 1991-12-04   year month day
fecha.addEventListener("change", revisarfecha);

// fecha.oninvalid = function (event) {
//   event.target.setCustomValidity("Ingrese una fecha válida");
// };
function revisarfecha() {
  if (fecha.value) {
  }

  let hoy = new Date();
  let birthday = new Date(fecha.value);
  let years = 1000 * 86400 * 365 * 18;

  if (hoy.getTime() - birthday.getTime() < years) {
    epf.innerHTML = `<p>Debes ser mayor de 18 años, ingresa la fecha de nacimiento nuevamente.</p>`;
    epf.classList.add("error");
  } else {
    console.log("Puede registrarse, es mayor");
    epf.innerHTML = ``;
  }
}

//saber que actividades favoritas fueron escogidas
//Si son checked cambian de color
let actividades = [];
let checkboxes = document.querySelectorAll(".activities");

for (let checkbox of checkboxes) {
  checkbox.addEventListener("click", function () {
    if (this.checked) {
      this.nextElementSibling.style.backgroundColor = "#254441";
      this.nextElementSibling.style.color = "#fff";
      actividades.push(this.value);
    } else {
      this.nextElementSibling.style.backgroundColor = "#fff";
      this.nextElementSibling.style.color = "black";
      actividades.push(this.value);
      actividades = actividades.filter((e) => e !== this.value);
    }
  });
}

//Registrando usuario

form.addEventListener("submit", function (event) {
  event.preventDefault();
});


document.querySelector("#registrarse").addEventListener("click", () => {
 
   if (estatura.value >= 100 && estatura.value < 220 && contrasena.value.length >= 8 && peso.value > 40){

    let persona = {
      fullname: nombre.value,
      email: email.value,
      username: usuario.value,
      pass: contrasena.value,
      height: estatura.value,
      weight: peso.value,
      birthday: fecha.value,
      activities: actividades,
    };
    console.log(JSON.stringify(persona));
  
    fetch("http://localhost/dwes/proyectoIntegrador/api/register/", {
      method: "POST",
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      },
     
      body: JSON.stringify(persona),
    })
      .then((response) => {
    
      
        switch (response.status) {
          case 200:
            divInfo.innerHTML = "<h1>Usuario registrado con éxito</h1>";
            divInfo.classList.add('success');
            break;
          case 400:
            divInfo.innerHTML =
              "<h2>Alguno de los campos es incorrecto o está vacío</h2>";
              break;
          case 409:
            infoUser.innerHTML = "<p>Nombre ya existente</p>";
            infoUser.classList.add('error');
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // if (data['success']) {
        //   sessionStorage.setItem("usuario", usuario.value);
           sessionStorage.setItem("id", data['id']);
        //   sessionStorage.setItem("token", data['token']);
        setTimeout(() => {
          window.location.href = "pagina-principal.html";
        }, 4000);
      //}
      });
  // }else{
  //   divInfo.innerHTML =
  //   "<h2>Alguno de los campos es incorrecto o está vacío</h2>";

   }
});
    

  


