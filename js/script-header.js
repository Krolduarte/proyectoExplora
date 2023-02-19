//Función que permite abrir modal y aplicar cambios en el menú
export function reloadScript() {
  let inicioSesion = document.querySelector(".iniciar-sesion");
  let token = sessionStorage.getItem("token");

    // **********************************************************
    // FUNCIONES PARA GESTIONAR EL INICIO DE SESION 
    // **********************************************************

  if (token) {
    //Funciones para gestionar barra de navegación en caso de que usuario tenga un token:
    inicioSesion.textContent = "Cerrar Sesión";
    console.log("Usuario Registrado: cambio en barra de navegación");
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

     // **********************************************************
    // LLAMADA A LA API PARA COMPROBAR CREDENCIALES Y GESTIONAR INICIO DE SESION
    // **********************************************************

  document.querySelector("#login").addEventListener("click", (e) => {
    e.preventDefault();

 
    fetch("api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        username: document.querySelector("#username").value,
        pass: document.querySelector("#password2").value,
      }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            return response.json();
            break;
          case 401:
            revisarCredenciales();
        }
      })
      .then((data) => {
        console.log(data);
        if (data["success"]) {
          sessionStorage.setItem(
            "usuario",
            document.querySelector("#username").value
          );
          sessionStorage.setItem("token", data["token"]);
        
          window.location.href = "pagina-principal.html";
       
        }
      });
  });
}

function revisarCredenciales() {
  document.querySelector(".mensajes").innerHTML =
    "<p>Credenciales no válidas</p>";
  document.querySelector("#username").classList.add("border-red");
  document.querySelector("#password2").classList.add("border-red");

  document.querySelector("#username").addEventListener("focus", intentar);
  function intentar() {
    document.querySelector(".mensajes").innerHTML = "";
    document.querySelector("#username").classList.remove("border-red");
    document.querySelector("#password2").classList.remove("border-red");
  }
}
