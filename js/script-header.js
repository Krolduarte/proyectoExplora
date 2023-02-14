//Función que permite abrir modal y aplicar cambios en el menú
export function reloadScript() {
  let inicioSesion = document.querySelector(".iniciar-sesion");
  let token =  sessionStorage.getItem("token");

  //funciones para mostrar en menu opciones de Perfil y quitar Registrarse
  if (token) {
    // fetch para guardar el nombre de usuario en local storage
    fetch(`api/users/?id=${ sessionStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        Authorization: sessionStorage.getItem("token"),
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
        // sessionStorage.setItem('username', data.username)
      });



    inicioSesion.textContent = "Cerrar Sesión";
    console.log("Tiene token cambia menu");
    inicioSesion.addEventListener("click", cerrarSesion);
    inicioSesion.removeEventListener("click", abrirModal);
    document.querySelector(".miperfil").style.display = "unset";
    document.querySelector(".misrutas").style.display = "unset";
    document.querySelector(".registrarse").style.display = "none";

    function cerrarSesion(e) {
    e.preventDefault();
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("usuario");
     sessionStorage.removeItem("id");
      console.log("No tiene token");
      window.location.href = "index.html";

    }
  } else {
    inicioSesion.textContent = "iniciar Sesión";
    inicioSesion.addEventListener("click", abrirModal);
    inicioSesion.addEventListener("click", function (event) {
      event.preventDefault();
    });
  }

  //Funciones que tienen que dependen de la ventana modal
  function abrirModal() {
    let closeBtn = document.querySelector("#closeBtn");
    closeBtn.addEventListener("click", cerrarModal);
    document.querySelector("#inicio").style.visibility = "visible";
    document.querySelector("#fondo").style.display = "unset";
  }

  function cerrarModal() {
    document.querySelector("#inicio").style.visibility = "hidden";
    document.querySelector("#fondo").style.display = "none";
  }

  //Gestionando inicio de sesión
  document.querySelector("#login").addEventListener("click", (e) => {
     e.preventDefault();


    let user = {
      username: document.querySelector("#username").value,
      pass: document.querySelector("#password2").value,
    };
 
    fetch("api/login/", {
      method: "POST",
      headers: {
        'Content-Type':'application/json;charset=utf-8'
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
            break;
          case 401:
            document.querySelector(".mensajes").innerHTML =
              "<p>Credenciales no válidas</p>";
              document.querySelector("#login").style.marginTop = "-13px";

          // mostrar div con error
        }
      })
      .then((data) => {
        console.log(data);
        if (data['success']) {
          sessionStorage.setItem("usuario", document.querySelector("#username").value);
          sessionStorage.setItem("token", data['token']);
        // sessionStorage.setItem("id", data['id']);
        // sessionStorage.setItem("token", data.token);
        //guardo y una vez que compruebo el token lo redirecciono
        // window.location.href
        window.location.href = "pagina-principal.html";
        }
      });
  });
}
