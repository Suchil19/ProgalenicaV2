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
document.addEventListener("DOMContentLoaded", () => {
  const carrito = [];
  const listaCarrito = document.getElementById("lista-carrito");
  const totalPrecio = document.getElementById("total-precio");
  const checkoutTotal = document.getElementById("checkout-total");
  const checkoutBtn = document.getElementById("checkout");

  document.querySelectorAll(".tarjetas__productos").forEach(producto => {
      const cantidadSpan = producto.querySelector(".cantidad");
      const precioTotalSpan = producto.querySelector(".precio-total");
      const precioUnitario = parseFloat(producto.getAttribute("data-precio"));
      let cantidad = 1;

      producto.querySelector(".menos").addEventListener("click", () => actualizarCantidad(-1));
      producto.querySelector(".mas").addEventListener("click", () => actualizarCantidad(1));
      producto.querySelector(".agregar-carrito").addEventListener("click", () => agregarAlCarrito());

      function actualizarCantidad(valor) {
          cantidad = Math.max(1, cantidad + valor);
          cantidadSpan.textContent = cantidad;
          precioTotalSpan.textContent = (precioUnitario * cantidad).toFixed(2);
      }

      function agregarAlCarrito() {
          carrito.push({
              id: producto.getAttribute("data-id"),
              nombre: producto.querySelector("h1").textContent,
              precio: precioUnitario * cantidad,
              cantidad
          });
          actualizarCarrito();
      }
  });

  function actualizarCarrito() {
      listaCarrito.innerHTML = "";
      let total = carrito.reduce((sum, item) => sum + item.precio, 0);
      totalPrecio.textContent = total.toFixed(2);
      checkoutTotal.textContent = total.toFixed(2);

      carrito.forEach((item, index) => {
          const li = document.createElement("li");
          li.textContent = `${item.nombre} - ${item.cantidad} piezas - $${item.precio.toFixed(2)}`;

          const eliminarBtn = document.createElement("button");
          eliminarBtn.textContent = "Eliminar";
          eliminarBtn.classList.add("eliminar");
          eliminarBtn.addEventListener("click", () => eliminarProducto(index));

          li.appendChild(eliminarBtn);
          listaCarrito.appendChild(li);
      });
  }

  function eliminarProducto(index) {
      carrito.splice(index, 1);
      actualizarCarrito();
  }

  checkoutBtn.addEventListener("click", () => {
      if (carrito.length === 0) {
          alert("El carrito está vacío.");
      } else {
          let checkoutContainer = document.createElement("div");
          checkoutContainer.innerHTML = `<h2>Resumen de compra</h2><ul id="lista-checkout"></ul><h3>Total: $<span id="checkout-total-final">${checkoutTotal.textContent}</span></h3>`;
          
          document.body.appendChild(checkoutContainer);
          const listaCheckout = document.getElementById("lista-checkout");

          carrito.forEach((item, index) => {
              const li = document.createElement("li");
              li.textContent = `${item.nombre} - ${item.cantidad} piezas - $${item.precio.toFixed(2)}`;
              
              const eliminarBtn = document.createElement("button");
              eliminarBtn.textContent = "Eliminar";
              eliminarBtn.addEventListener("click", () => {
                  carrito.splice(index, 1);
                  actualizarCarrito();
                  actualizarCheckout(listaCheckout);
              });

              li.appendChild(eliminarBtn);
              listaCheckout.appendChild(li);
          });
      }
  });

  function actualizarCheckout(listaCheckout) {
      listaCheckout.innerHTML = "";
      let total = carrito.reduce((sum, item) => sum + item.precio, 0);
      document.getElementById("checkout-total-final").textContent = total.toFixed(2);

      carrito.forEach((item, index) => {
          const li = document.createElement("li");
          li.textContent = `${item.nombre} - ${item.cantidad} piezas - $${item.precio.toFixed(2)}`;

          const eliminarBtn = document.createElement("button");
          eliminarBtn.textContent = "Eliminar";
          eliminarBtn.addEventListener("click", () => {
              carrito.splice(index, 1);
              actualizarCarrito();
              actualizarCheckout(listaCheckout);
          });

          li.appendChild(eliminarBtn);
          listaCheckout.appendChild(li);
      });
  }
});
