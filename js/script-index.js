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

// Funciones para mover las imagenes en el landing page
let btnNext = document.querySelector(".btnNext");
btnNext.addEventListener("click", goFwd);
let contador = 1;
let btnPrevious = document.querySelector(".btnPrevious");
btnPrevious.addEventListener("click", goBack);
function goFwd(event) {
  if (contador < 5) {
    ++contador;
    event.target.href = `#slide${contador}`;
  }
}
function goBack(event) {
  console.log("back");
  console.log(contador);
  if (contador > 0) {
    --contador;
    event.target.href = `#slide${contador}`;
  }
}


document.querySelector('#buscadorInput').addEventListener('blur', abrirPaginaPrincipal);
document.querySelector('#buscadorInput').addEventListener('keydown', enviarDestino);

function abrirPaginaPrincipal(){

  localStorage.setItem('destino', document.querySelector('#buscadorInput').value)

  window.location.href= "./pagina-principal.html"
 
}

function enviarDestino(e){
  if(e.code === 'Enter') {
    localStorage.setItem('destino', document.querySelector('#buscadorInput').value)
    window.location.href= "./pagina-principal.html"
  }

  


 
}