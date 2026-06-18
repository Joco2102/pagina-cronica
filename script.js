/* ==========================================================================
   PORTAL "CRÓNICA" — script.js
   ==========================================================================
   Acá vive TODA la interactividad con JavaScript nativo (sin librerías).
   Dos cosas:
     A) Los carruseles (horizontales y el vertical de "Hace instantes").
     B) Un pequeño toggle para el botón de menú (☰).
   ========================================================================== */


/* ==========================================================================
   A) CARRUSELES
   --------------------------------------------------------------------------
   La estructura HTML de CADA carrusel es siempre la misma:

     <div class="carrusel">                  <- contenedor (posiciona flechas)
        <button class="carrusel-flecha anterior">
        <div class="carrusel-pista"> ...items... </div>   <- esto se desplaza
        <button class="carrusel-flecha siguiente">
     </div>

   Si el carrusel es VERTICAL lleva además la clase "carrusel--vertical".
   ========================================================================== */

// 1) SELECCIÓN DEL DOM
//    querySelectorAll devuelve TODOS los ".carrusel" en una lista. Así, un
//    mismo bloque de código configura todos los carruseles de la página.
const carruseles = document.querySelectorAll(".carrusel");

// 2) Recorremos cada carrusel y lo configuramos por separado.
carruseles.forEach(function (carrusel) {

  // Buscamos las piezas DENTRO de este carrusel (no en todo el documento)
  // usando carrusel.querySelector. Esto evita mezclar los botones de un
  // carrusel con los de otro cuando hay varios iguales en la página.
  const pista     = carrusel.querySelector(".carrusel-pista");
  const flechaAnt = carrusel.querySelector(".carrusel-flecha.anterior");
  const flechaSig = carrusel.querySelector(".carrusel-flecha.siguiente");

  // ¿Este carrusel es vertical? (lo sabemos por la clase modificadora)
  const esVertical = carrusel.classList.contains("carrusel--vertical");

  // 3) Cuánto se mueve por clic: el 80% del tamaño visible de la pista.
  //    - En horizontal usamos clientWidth (ancho visible).
  //    - En vertical usamos clientHeight (alto visible).
  function pasoDeScroll() {
    return esVertical ? pista.clientHeight * 0.8 : pista.clientWidth * 0.8;
  }

  // 4) Función única para mover. 'direccion' es -1 (atrás) o +1 (adelante).
  //    scrollBy desplaza la pista; según el eje usamos top (vertical) o left.
  //    behavior:"smooth" hace que el movimiento sea animado y suave.
  function mover(direccion) {
    const cantidad = pasoDeScroll() * direccion;
    if (esVertical) {
      pista.scrollBy({ top: cantidad, behavior: "smooth" });
    } else {
      pista.scrollBy({ left: cantidad, behavior: "smooth" });
    }
  }

  // 5) EVENT LISTENERS de las flechas.
  //    (Comprobamos que existan por si algún carrusel no las tuviera.)
  if (flechaAnt) flechaAnt.addEventListener("click", function () { mover(-1); });
  if (flechaSig) flechaSig.addEventListener("click", function () { mover(1); });

  // 6) Ocultar la flecha de un extremo cuando ya no hay a dónde seguir.
  function actualizarFlechas() {
    let enInicio, enFinal;

    if (esVertical) {
      // scrollTop = cuánto bajó la pista desde arriba.
      enInicio = pista.scrollTop <= 0;
      // Llegó al final si lo desplazado + lo visible cubre todo el contenido.
      // scrollHeight = alto total del contenido (incluido lo oculto).
      enFinal = pista.scrollTop + pista.clientHeight >= pista.scrollHeight - 1;
    } else {
      // scrollLeft = cuánto se corrió la pista desde la izquierda.
      enInicio = pista.scrollLeft <= 0;
      // scrollWidth = ancho total del contenido (incluido lo oculto).
      enFinal = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 1;
    }

    // visibility:"hidden" oculta el botón pero conserva su espacio.
    if (flechaAnt) flechaAnt.style.visibility = enInicio ? "hidden" : "visible";
    if (flechaSig) flechaSig.style.visibility = enFinal  ? "hidden" : "visible";
  }

  // Estado inicial (esconde la flecha "anterior" al cargar la página)...
  actualizarFlechas();
  // ...y se recalcula cada vez que el usuario desplaza la pista...
  pista.addEventListener("scroll", actualizarFlechas);
  // ...y cuando cambia el tamaño de la ventana (el tamaño visible cambia).
  window.addEventListener("resize", actualizarFlechas);
});


/* ==========================================================================
   B) BOTÓN DE MENÚ (☰)
   --------------------------------------------------------------------------
   Demostración simple de un Event Listener: al hacer clic en el botón de
   menú, mostramos u ocultamos el submenú "TEMAS DE HOY" agregando/quitando
   una clase. En una web real acá abriría un panel lateral, etc.
   ========================================================================== */
const btnMenu = document.getElementById("btnMenu");
const submenu = document.getElementById("submenu");

if (btnMenu && submenu) {
  btnMenu.addEventListener("click", function () {
    // classList.toggle agrega la clase si no está, y la quita si ya está.
    submenu.classList.toggle("submenu--oculto");
  });
}

