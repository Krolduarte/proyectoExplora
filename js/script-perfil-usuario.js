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

let emailValido = true;
let validHeight = true;
let validWeight = true;
let validBirthday = true;
let validPwd = true;
let newPwd = false;

getData();

let activitiesUpdates = [];
let checkboxes = document.querySelectorAll(".activities");

//Hacer fetch para obtener los datos del usuario

function getData() {
  let url = `http://localhost/dwes/proyectoIntegrador/api/users?username=${sessionStorage.getItem(
    "usuario"
  )}`;

  console.log(url);
  fetch(`${url}`, {
    // fetch(`http://localhost:5000/api/user/?id=${localStorage.getItem("id")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //ç Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          break;
      }

      return response.json();
    })
    .then((data) => {
      sessionStorage.setItem("id", data[0].id);
      document.querySelector("#usuario").value = data[0].username;
      document.querySelector("#email").value = data[0].email;
      document.querySelector("#estatura").value = data[0].height;
      document.querySelector("#peso").value = data[0].weight;
      document.querySelector("#fecha").value = data[0].birthday;
      document.querySelector("#nombre").value = data[0].fullname;
      document.querySelector(".profileName").innerHTML = data[0].username;

      let activities = data[0].activities;
      let arrayActivities = activities.split(",");

      for (let activity of arrayActivities) {
        for (let checkbox of checkboxes) {
          if (checkbox.value == activity) {
            checkbox.nextElementSibling.style.backgroundColor = "#254441";
            checkbox.nextElementSibling.style.color = "#fff";
            //agregar si hay alguna actividad escogida al array dque se pasa en el fetch con el metodo put.
            activitiesUpdates.push(checkbox.value);
          }
        }
      }

      // funcion para editar la contraseña
      document.querySelector("#editPwd").addEventListener("click", editPwd);
      function editPwd(e) {
        e.preventDefault();
        document.querySelector("#showPwd").style.visibility = "visible";
        document.querySelector("#editPwd").style.display = "none";
      }

      document
        .querySelector("#showPwd")
        .addEventListener("blur", checkSecurity);

      document
        .querySelector("#showPwd")
        .addEventListener("focus", removeErrorMsg);

      // ###############################################
      //         SEGURIDAD DE LA CONTRASEÑA NUEVA
      // ###############################################
      function checkSecurity(e) {
        validPwd = false;
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
          validPwd = true;
          newPwd = true;
        } else {
          document.querySelector("#showPwd").classList.add("border-red");
        }
        //   console.log(`Password" ${pass} `);
        //    console.log(`Security ${security}`);
      }
    });
}

function removeErrorMsg(e) {
  e.target.nextElementSibling.innerHTML = "";
  e.target.classList.remove("border-red");
}

// ###############################################
// VALIDANDO CORREO ELECTRONICO
// ###############################################

email.addEventListener("blur", checkMail);
email.addEventListener("focus", removeErrorMsg);

let infoEmail = document.querySelector(".infoemail");
let emailReg = /[a-z0-9\._-]+@([a-zA-Z]+\.)+[a-zA-Z]{2,}$/;

function checkMail() {
  emailValido = false;
  if (!emailReg.test(email.value)) {
    email.classList.add("border-red");
    infoEmail.innerHTML = `<p>*Correo electrónico no valido</p>`;
  } else {
    emailValido = true;
  }
}

// ###############################################
//        VERIFICAR ESTATURA
// ###############################################

estatura.addEventListener("blur", checkHeight);
estatura.addEventListener("focus", removeErrorMsg);

function checkHeight(e) {
  validHeight = false;
  console.log(estatura.value);
  if (estatura.value < 50 || estatura.value > 220) {
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
  validWeight = false;

  if (peso.value < 40 || peso.value > 2800) {
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
  validBirthday = false;
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

// **********************************************************
// REVISAR SI USUARIO ESCOGE NUEVAS ACTIVIDADES Y AÑADIRLAS A ACTIVITIESUPDATES ARRAY
// **********************************************************

for (let checkbox of checkboxes) {
  checkbox.addEventListener("click", function () {
    if (this.checked) {
      this.nextElementSibling.style.backgroundColor = "#254441";
      this.nextElementSibling.style.color = "#fff";
      activitiesUpdates.push(this.value);
    } else {
      this.nextElementSibling.style.backgroundColor = "#fff";
      this.nextElementSibling.style.color = "black";
      activitiesUpdates.push(this.value);
      activitiesUpdates = activitiesUpdates.filter((e) => e !== this.value);
    }
  });
}

// checkMail();
// checkHeight();
// checkWeight();
// checkDate();

// ###############################################
//  MODIFICAR PERFIL DE USUARIO SI INFO ES VALIDA
// ###############################################

document.querySelector("#modificar").addEventListener("click", editarUsuario);
function editarUsuario(e) {
  e.preventDefault();
  let newuser = {};
  if (emailValido && validHeight && validWeight && validBirthday && validPwd) {
    newuser = {
      id: sessionStorage.getItem("id"),
      email: document.querySelector("#email").value,
      // pass: document.querySelector("#showPwd").value,
      height: document.querySelector("#estatura").value,
      weight: document.querySelector("#peso").value,
      birthday: document.querySelector("#fecha").value,
      activities: activitiesUpdates,
    };

    if (newPwd) {
      let password = {
        pass: document.querySelector("#showPwd").value,
      };
      Object.assign(newuser, password);
    }

    console.log(newuser);

    fetch(`http://localhost/dwes/proyectoIntegrador/api/edituser/`, {
      method: "PUT",
      headers: {
        // Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    })
      .then((response) => {
        switch (response.status) {
          case 400:
            console.log("identificador no valido");
            break;
          case 401:
            console.log("token no valido");
            break;
          case 200:
            console.log("El usuario se ha actualizado correctamente");
            document.querySelector(".divInfo").innerHTML =
              "<h3>Datos de usuario actualizados</h3>";
            document.querySelector(".divInfo").classList.add("success");
            break;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  } else {
    document.querySelector(".divInfo").innerHTML =
      "<h3>Revise los cambios para que la información sea válida</h3>";
  }
}

// Funcion para eliminar la cuenta
document.querySelector(".eliminar").addEventListener("click", eliminar);

function eliminar(e) {
  e.preventDefault();
  let url = `http://localhost/dwes/proyectoIntegrador/api/users/?id=${sessionStorage.getItem(
    "id"
  )}`;
  console.log(url);
  fetch(`${url}`, {
    method: "DELETE",
    headers: {
      // Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      switch (response.status) {
        case 400:
          break;
        // case 401:
        //   console.log("token no valido");
        //   break;
        case 200:
          document.querySelector(".divInfo").innerHTML =
            "<h4>Se ha eliminado correctamente el usuario</h4>";
          document.querySelector(".divInfo").classList.add("success");

          setTimeout(() => {
            window.location.href = "pagina-principal.html";
          }, 1000);

          break;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
