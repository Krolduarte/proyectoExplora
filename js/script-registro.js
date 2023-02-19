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
let validPwds = false;
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
    infoEmail.innerHTML = `<p>*Correo electrónico no valido</p>`;
  } else {
    emailValido = true;
  }
}

// Esta función sera utilizada en todos los parámetros para remover el borde rojo al poner el foco de nuevo

function removeErrorMsg(e) {
  e.target.nextElementSibling.innerHTML = "";
  e.target.classList.remove("border-red");
}

// ###############################################
//         VALIDANDO PATRON DE USUARIO
// ###############################################
let infoUser = document.querySelector(".infouser");

usuario.addEventListener("blur", checkUser);
usuario.addEventListener("focus", removeErrorMsg);

function checkUser() {

    if (usuario.value !== ""){
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
                  infoUser.innerHTML = `
                  <lord-icon
                  src="https://cdn.lordicon.com/egiwmiit.json"
                  trigger="loop"
                  delay="2000"
                  style="width:15px;height:15px">
                </lord-icon> Nombre de usuario disponible`;
                  userValido = true;
                  break;
        
                case 400:
                  infoUser.innerHTML = `<p>*Nombre existente.</p>`;
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
contrasena.addEventListener("blur", checkSecurity);
contrasena.addEventListener("focus", removeErrorMsg);

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

  //   Funcion que revise la seguridad en cuanto al contenido de digitos, mayusculas, minusculas y simbolos

  if (security > 0 && security < 4) {
    infoSecurity.innerHTML =
      "Contraseña muy debil, usa al menos un número, una mayúscula y un simbolo";
    infoSecurity.style.color = "purple";
    contrasena.classList.add("border-red");
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

  if (security >= 6) {
    validPwds = true;
  }else{
   
  }
//   console.log(`Password" ${pass} `);
//    console.log(`Security ${security}`);
}

//Funciones para contraseña y repetir contraseña
pwdRepeatInput.addEventListener("focus", removeErrorMsg);
pwdRepeatInput.addEventListener("blur", checkPasswordsMatch);

let infopwd = document.querySelector(".infopwd");

function checkPasswordsMatch() {
  if (pwdRepeatInput.value != contrasena.value) {
    infopwd.innerHTML = "";
    pwdRepeatInput.classList.add("border-red");
    pwdRepeatInput.classList.add("border-red");
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
  console.log(estatura.value);
  if (e.target.value < 50 || e.target.value.value > 220) {
    document.querySelector("#infoestatura").innerHTML =
      "<p>*Ingrese una estatura válida en metros</p>";
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
  console.log(e.target.value);
  if (e.target.value < 40 || e.target.value > 2800) {
    document.querySelector("#infopeso").innerHTML =
      "<p>*Ingrese un peso válido en kilogramos</p>";
    peso.classList.add("border-red");
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

  if (hoy.getTime() - birthday.getTime() < years) {
    fecha.classList.add("border-red");
    document.querySelector(
      "#infofecha"
    ).innerHTML = `<p>Debes ser mayor de 18 años, ingresa la fecha de nacimiento nuevamente.</p>`;
  } else {
    console.log("Puede registrarse, es mayor");
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
    validPwds &&
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
            break;
          case 400:
            divInfo.innerHTML = "<h2>Hubo un fallo en el registro</h2>";
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
        sessionStorage.setItem("id", data["id"]);
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
