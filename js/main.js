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


// Filtrar

function filterProducts(laboratorio) {
  const cards = document.querySelectorAll('.tarjetas__productos');
  cards.forEach(card => {
      card.style.display = (laboratorio === 'all' || card.getAttribute('data-lab') === laboratorio) ? 'block' : 'none';
  });
}

// Muestra todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  filterProducts('all');
});





// Carrito 
