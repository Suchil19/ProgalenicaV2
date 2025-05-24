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



// Carrito
let total = 0;
let carrito = [];
let contadorProductos = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    contadorProductos++;

    document.getElementById("total").textContent = total;
    document.getElementById("contador").textContent = contadorProductos;

    // Animación en el carrito
    let carritoElemento = document.querySelector(".carrito");
    carritoElemento.classList.add("agregado");
    setTimeout(() => carritoElemento.classList.remove("agregado"), 300);
}

function mostrarCheckout() {
    let listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.innerHTML = `${producto.nombre} - $${producto.precio} 
                          <button onclick="eliminarProducto(${index})">❌</button>`;
        listaProductos.appendChild(item);
    });

    document.getElementById("checkout-total").textContent = total;
    document.getElementById("checkout-modal").style.display = "block";
}

function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    contadorProductos--;

    document.getElementById("total").textContent = total;
    document.getElementById("contador").textContent = contadorProductos;

    mostrarCheckout();
}

function cerrarCheckout() {
    document.getElementById("checkout-modal").style.display = "none";
}

function confirmarCompra() {
    alert("Compra realizada con éxito!");
    carrito = [];
    total = 0;
    contadorProductos = 0;
    document.getElementById("total").textContent = total;
    document.getElementById("contador").textContent = contadorProductos;
    cerrarCheckout();
}