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


//Producto ZOOM

document.getElementById("product-image").addEventListener("click", function() {
  this.classList.toggle("zoomed");
});


// Agregar productos
function increaseQuantity() {
  let qty = document.getElementById("quantity");
  qty.value = parseInt(qty.value) + 1;
}

function decreaseQuantity() {
  let qty = document.getElementById("quantity");
  if (qty.value > 1) {
      qty.value = parseInt(qty.value) - 1;
  }
}

function agregarAlCarrito() {
  let cantidad = document.getElementById("quantity") ? document.getElementById("quantity").value : 1;
  alert(`Se han agregado ${cantidad} piezas al carrito.`);
}

// Agregar productos
