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

getData();
let activitiesUpdates = [];
let checkboxes = document.querySelectorAll(".activities");
//Hacer fetch para obtener los datos del usuario

function getData() {

  let url = `http://localhost/dwes/proyectoIntegrador/api/users?username=${sessionStorage.getItem("usuario")}`;
console.log(url);
  fetch(`${url}`, {
  // fetch(`http://localhost:5000/api/user/?id=${localStorage.getItem("id")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: localStorage.getItem("token"),

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
      console.log(data[0]);
      // console.log(data[0]);
      document.querySelector("#usuario").value = data[0].username;
      document.querySelector("#email").value = data[0].email;
      // document.querySelector("#showPwd").value = data[0].pass;
      document.querySelector("#estatura").value = data[0].height;
      document.querySelector("#peso").value = data[0].weight;
      document.querySelector("#fecha").value = data[0].birthday;
      document.querySelector("#nombre").value = data[0].fullname;
      document.querySelector(".profileName").innerHTML = data[0].username;

// console.log(data.birthday.replaceAll('/','-'));
      // console.log(document.querySelector("#fecha").value);

    
      let activities = data[0].activities;
      let arrayActivities = activities.split(','); 
      // console.log(arrayActivities);

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
        document.querySelector("#showPwd").value = data.pass;
        document.querySelector("#editPwd").style.display = "none";
      }
    });
}

// función para subir foto del usuario
// document.querySelector('btnImg'),addEventListener('click', subirFoto);
// btnImg.style.display="none";
// function subirFoto(e){
//   e.target.nextElementSibling.click();
// }

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

//Modificar perfil de usuario
document.querySelector("#modificar").addEventListener("click", editarUsuario);
function editarUsuario(e) {
  let newuser = {
    id: sessionStorage.getItem("id"),
    email: document.querySelector("#email").value,
    // pass: document.querySelector("#showPwd").value,
    height: document.querySelector("#estatura").value,
    weight: document.querySelector("#peso").value,
    birthday: document.querySelector("#fecha").value,
    activities: activitiesUpdates,
  };

  e.preventDefault();


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

          // setTimeout(() => {
          //   window.location.href = "pagina-principal.html";
          // }, 3000);

          break;
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

// Funcion para eliminar la cuenta
document.querySelector(".eliminar").addEventListener("click", eliminar);

function eliminar(e) {
  e.preventDefault();
let url = `http://localhost/dwes/proyectoIntegrador/api/users/?id=${sessionStorage.getItem("id")}`
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
