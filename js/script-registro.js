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
let email = document.querySelector("#email");
let usuario = document.querySelector("#usuario");
let contrasena = document.getElementById("pwd");
let estatura = document.querySelector("#estatura");
let peso = document.querySelector("#peso");
let fecha = document.querySelector("#fecha");
let divInfo = document.querySelector(".info");

let emailValido = false;
let userValido = false;
let validMatch = false;
let validPwd = false;
let validHeight = false;
let validWeight = false;
let validBirthday = false;

// ###############################################
// VALIDANDO CORREO ELECTRONICO
// ###############################################

email.addEventListener("blur", checkMail);
email.addEventListener("focus", removeErrorMsg);

let infoEmail = document.querySelector(".infoemail");
let emailReg = /[a-z0-9\._-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;

function checkMail() {
  if (!emailReg.test(email.value)) {
    email.classList.add("border-red");
    infoEmail.innerHTML = `*Correo electrónico no valido`;
    infoEmail.classList.add("grey");
  } else {
    emailValido = true;
    infoEmail.classList.remove("grey");
  }
}

// Esta función sera utilizada en todos los parámetros para remover el borde rojo al poner el foco de nuevo

function removeErrorMsg(e) {
  e.target.nextElementSibling.innerHTML = "";
  e.target.classList.remove("border-red");
  e.target.nextElementSibling.classList.remove("grey");
}

// ###############################################
//         VALIDANDO PATRON DE USUARIO
// ###############################################
let infoUser = document.querySelector(".infouser");

usuario.addEventListener("blur", checkUser);
usuario.addEventListener("focus", removeErrorMsg);

function checkUser() {
  if (usuario.value !== "") {
    fetch(
      `http://localhost/dwes/proyectoIntegrador/api/checkuser?username=${usuario.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        req: JSON.stringify(usuario.value),
      }
    )
      .then((response) => {
        switch (response.status) {
          case 200:
     
            userValido = true;
            break;

          case 400:
            infoUser.innerHTML = `*Nombre existente.`;
            infoUser.classList.add("grey");
            usuario.classList.add("border-red");
            userValido = false;
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}

// ###############################################
//         SEGURIDAD DE LA CONTRASEÑA
// ###############################################

// Seguridad de la contraseña (muy débil, débil, aceptable, fuerte, muy segura).
let infoSecurity = document.querySelector(".infopwd1");
contrasena.addEventListener("keyup", checkSecurity);
contrasena.addEventListener("focus", removeErrorMsg);

infoSecurity.addEventListener('click', pwdWarning);
function pwdWarning(){
  document.querySelector('.pwdWarning').style.display="unset";
 document.querySelector('.pwdWarning').innerHTML= `Incluye una mayúscula, un número y un símbolo.`;

}

function checkSecurity(e) {
  document.querySelector('.pwdWarning').style.display="none";
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

  //   Funcion que revise la seguridad en cuanto al contenido de digitos, mayusculas, minusculas y simbolos

  // infoSecurity.classList.add("grey");

  if (security > 0 && security < 4) {
    // infoSecurity.innerHTML = "Contraseña muy debil";
    infoSecurity.style.backgroundColor = "red";
    infoSecurity.textContent= "!";
   
  }
  if (security == 5) {
    // infoSecurity.innerHTML = "Contraseña debil";
    infoSecurity.style.backgroundColor = "red";
    infoSecurity.textContent= "!";
  }

  if (security == 6) {
    // infoSecurity.innerHTML = "Contraseña aceptable";
    infoSecurity.style.backgroundColor = "yellowgreen";
    infoSecurity.textContent= "ok";
  }

  if (security == 7) {
    // infoSecurity.innerHTML = "Contraseña fuerte";
    infoSecurity.style.backgroundColor = "green";
    infoSecurity.textContent= "ok";
  }

  if (security >= 8) {
    // infoSecurity.innerHTML = "Contraseña muy segura";
    infoSecurity.style.backgroundColor = "green";
    infoSecurity.textContent= "ok";
  }

  if (security >= 6) {
    validPwd = true;
    document.querySelector('.pwdWarning').style.display="none";

  } else{
    document.querySelector('#pwd').classList.add("border-red");
  }
}
 
  //   console.log(`Password" ${pass} `);
  //    console.log(`Security ${security}`);


//Funciones para contraseña y repetir contraseña
pwdRepeatInput.addEventListener("focus", removeErrorMsg);
pwdRepeatInput.addEventListener("blur", checkPasswordsMatch);

let infopwd = document.querySelector(".infopwd");

function checkPasswordsMatch() {
  if (pwdRepeatInput.value != contrasena.value) {
    infopwd.innerHTML = "Contraseñas no coinciden";
    pwdRepeatInput.classList.add("border-red");
    infopwd.classList.add("grey");
  } else {
    validMatch = true;
  }
}

// ###############################################
//        VERIFICAR ESTATURA
// ###############################################

estatura.addEventListener("blur", checkHeight);
estatura.addEventListener("focus", removeErrorMsg);

function checkHeight(e) {

  if (e.target.value < 50 || e.target.value > 220) {
    document.querySelector(".infoestatura").innerHTML =
    "*No es un peso válido en kg.";
    document.querySelector(".infoestatura").classList.add("grey");
    estatura.classList.add("border-red");
  } else {
    validHeight = true;
  }
}

// ###############################################
//        VERIFICAR PESO
// ###############################################
peso.addEventListener("blur", checkWeight);
peso.addEventListener("focus", removeErrorMsg);

function checkWeight(e) {

  if (e.target.value < 40 || e.target.value > 280) {
    document.querySelector(".infopeso").innerHTML =
      "*No es un peso válido en kg.";
    peso.classList.add("border-red");
    document.querySelector(".infopeso").classList.add("grey");
  } else {
    validWeight = true;
  }
}

// ###############################################
//        VERIFICAR FECHA
// ###############################################

fecha.addEventListener("blur", checkDate);
fecha.addEventListener("focus", removeErrorMsg);

function checkDate() {
 
  let hoy = new Date();
  let birthday = new Date(fecha.value);
  let years = 1000 * 86400 * 365 * 18;
    let limitRange = 1000 * 86400 * 365 * 100;

  if (
    hoy.getTime() - birthday.getTime() < years ||
    hoy.getTime() - birthday.getTime() > limitRange
  ) {
    fecha.classList.add("border-red");
    document.querySelector(
      ".infofecha"
    ).innerHTML = `Fecha no válida`;

    document.querySelector(".infofecha").classList.add("grey");
  } else {
   
    validBirthday = true;
  }
}

// ###############################################
//        GESTION DE ELECCION DE ACTIVIDADES
// ###############################################
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

// ###############################################
//       REGISTRAR USUARIO SI LOS DATOS SON VALIDOS
// ###############################################

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

document.querySelector("#registrarse").addEventListener("click", () => {
  // Hacer el fetch solo si se cumplen estasn condiciones
  if (
    emailValido &&
    userValido &&
    validMatch &&
    validPwd &&
    validHeight &&
    validWeight &&
    validBirthday
  ) {
    fetch("http://localhost/dwes/proyectoIntegrador/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },

      body: JSON.stringify({
        fullname: nombre.value,
        email: email.value,
        username: usuario.value,
        pass: contrasena.value,
        height: estatura.value,
        weight: peso.value,
        birthday: fecha.value,
        activities: actividades,
      }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            divInfo.innerHTML = "<h1>Usuario registrado con éxito</h1>";
            divInfo.classList.add("success");
            sessionStorage.setItem("id", data["id"]);
            break;
          case 400:
            divInfo.innerHTML = "<h2>Hubo un fallo en el registro</h2>";
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert("Te has registrado correctamente. Inicia Sesión")
        document.querySelector("#fondo").style.display = "unset";
        document.querySelector("#inicio").style.visibility = "visible";
        document
          .querySelector("#closeBtn")
          .addEventListener("click", cancelarLogin);
      
        function cancelarLogin() {
          document.querySelector("#inicio").style.visibility = "hidden";
           window.location.href = "pagina-principal.html";
        }
        // if (data['success']) {
        //   sessionStorage.setItem("usuario", usuario.value);
       
        //   sessionStorage.setItem("token", data['token']);
        // setTimeout(() => {
        //   window.location.href = "pagina-principal.html";
        // }, 4000);
        //}
      });
    // }else{
    //   divInfo.innerHTML =
    //   "<h2>Alguno de los campos es incorrecto o está vacío</h2>";
  }
});






document.querySelector('#linkInicio').addEventListener('click', mostrarLogin)
function mostrarLogin(e){
  e.preventDefault();
  document.querySelector("#fondo").style.display = "unset";
  document.querySelector("#inicio").style.visibility = "visible";
  document
    .querySelector("#closeBtn")
    .addEventListener("click", cancelarLogin);

  function cancelarLogin() {
    document.querySelector("#inicio").style.visibility = "hidden";
     window.location.href = "pagina-principal.html";
  }




}