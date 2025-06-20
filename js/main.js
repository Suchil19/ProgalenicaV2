// Preloader
$(window).on('load', function() {
	$('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
});

$(document).ready(function(){
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", navToggle);

function navToggle() {
   navToggler.classList.toggle("active");
   const nav = document.querySelector(".nav");
   nav.classList.toggle("open");
   if(nav.classList.contains("open")){
       nav.style.maxHeight = nav.scrollHeight + "px";
   }
   else{
       nav.removeAttribute("style");
   }
}}); 

// Filtrar productos
function filterProducts(laboratorio) {
  console.log(`Filtrando por: ${laboratorio}`);
  const cards = document.querySelectorAll('.tarjetas__productos');
  
  cards.forEach(card => {
      if (laboratorio === 'all') {
        card.style.display = 'block';
      } else {
        card.style.display = (card.getAttribute('data-lab') === laboratorio) ? 'block' : 'none';
      }
  });
  
  // Actualizar botones activos
  const botones = document.querySelectorAll('.filtrar__laboratorios button');
  botones.forEach(btn => btn.classList.remove('active'));
  
  // Encontrar y activar el botón correspondiente
  const botonActivo = document.querySelector(`.filtrar__laboratorios button[onclick="filterProducts('${laboratorio}')"]`);
  if (botonActivo) {
    botonActivo.classList.add('active');
  }
}

// Agregar productos
function agregarAlCarrito() {
  let cantidad = document.getElementById("quantity") ? document.getElementById("quantity").value : 1;
  alert(`Se han agregado ${cantidad} piezas al carrito.`);
}

// Hacer la función filterProducts disponible globalmente
window.filterProducts = filterProducts;

// buscar los productos en la vista productos en administrador

