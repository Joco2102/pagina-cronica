/* ==========================================================================
   PORTAL "CRÓNICA" — script.js
   ==========================================================================
   A) Carruseles (horizontales + el vertical de "Hace instantes")
   B) Botón de menú ☰ (abre/cierra el desplegable y se cierra al clic afuera)
   ========================================================================== */


/* ==========================================================================
   A) CARRUSELES (Vanilla JS, sin librerías)
   --------------------------------------------------------------------------
   Estructura de cada carrusel:
     .carrusel
        .carrusel-flecha.anterior
        .carrusel-pista   <- la fila/columna con scroll que se mueve
        .carrusel-flecha.siguiente
   Si lleva la clase "carrusel--vertical", el desplazamiento es vertical.
   ========================================================================== */

// 1) Tomamos TODOS los carruseles de la página.
const carruseles = document.querySelectorAll(".carrusel");

// 2) Configuramos cada uno por separado.
carruseles.forEach(function (carrusel) {
  // Buscamos las piezas DENTRO de este carrusel (no en todo el documento).
  const pista     = carrusel.querySelector(".carrusel-pista");
  const flechaAnt = carrusel.querySelector(".carrusel-flecha.anterior");
  const flechaSig = carrusel.querySelector(".carrusel-flecha.siguiente");

  // Si por alguna razón faltara la pista, salimos para no romper nada.
  if (!pista) return;

  // ¿Es vertical? Lo detectamos por la clase modificadora del contenedor.
  const esVertical = carrusel.classList.contains("carrusel--vertical");

  // 3) Cuánto se mueve por clic: 80% del tamaño visible de la pista.
  function paso() {
    return esVertical ? pista.clientHeight * 0.8 : pista.clientWidth * 0.8;
  }

  // 4) Función única para mover. 'dir' es -1 (atrás) o +1 (adelante).
  function mover(dir) {
    const cantidad = paso() * dir;
    if (esVertical) {
      pista.scrollBy({ top: cantidad, behavior: "smooth" });
    } else {
      pista.scrollBy({ left: cantidad, behavior: "smooth" });
    }
  }

  // 5) Event listeners de las flechas.
  if (flechaAnt) flechaAnt.addEventListener("click", function () { mover(-1); });
  if (flechaSig) flechaSig.addEventListener("click", function () { mover(1); });

  // 6) Ocultamos la flecha del extremo cuando no hay a dónde seguir.
  function actualizarFlechas() {
    let enInicio, enFinal;
    if (esVertical) {
      enInicio = pista.scrollTop <= 0;
      enFinal  = pista.scrollTop + pista.clientHeight >= pista.scrollHeight - 1;
    } else {
      enInicio = pista.scrollLeft <= 0;
      enFinal  = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 1;
    }
    if (flechaAnt) flechaAnt.style.visibility = enInicio ? "hidden" : "visible";
    if (flechaSig) flechaSig.style.visibility = enFinal  ? "hidden" : "visible";
  }

  actualizarFlechas();
  pista.addEventListener("scroll", actualizarFlechas);
  window.addEventListener("resize", actualizarFlechas);
});


/* ==========================================================================
   B) BOTÓN DE MENÚ ☰
   ========================================================================== */
const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menuDesplegable");

if (btnMenu && menu) {
  // Abrir/cerrar al hacer clic en el botón.
  btnMenu.addEventListener("click", function (evento) {
    evento.stopPropagation();   // evita que el clic cierre el menú al instante
    menu.classList.toggle("menu-desplegable--oculto");
  });

  // Cerrar si se hace clic FUERA del menú o del botón.
  document.addEventListener("click", function (evento) {
    const clicDentro = menu.contains(evento.target) || btnMenu.contains(evento.target);
    if (!clicDentro) menu.classList.add("menu-desplegable--oculto");
  });
}
