// ejemplo.js
// Este script carga los detalles del producto usando el id de la URL

const API_URL = 'https://progalenica-back.onrender.com/progalenica/productos/'; // Ajusta si es necesario

// Obtener el id del producto de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let cantidadMaxima = 1; // Se actualizará al renderizar el producto

async function cargarDetalleProducto() {
  if (!id) {
    document.getElementById('producto').innerHTML = '<p>Producto no especificado.</p>';
    return;
  }
  try {
    const response = await fetch(API_URL + id);
    const result = await response.json();
    if (!result.success) throw new Error(result.message || 'No se encontró el producto');
    renderProducto(result.data);
  } catch (error) {
    document.getElementById('producto').innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function renderProducto(producto) {
  const contenedor = document.getElementById('producto');
  if (!contenedor) return;
  cantidadMaxima = producto.cantidad_real || 1;
  contenedor.innerHTML = `
    <div class="card__producto">
      <div class="imagen__producto">
        <img class="product-image" src="${producto.imagen || '../img/productos/apthon.png'}" alt="${producto.nombre || ''}">
      </div>
      <div class="info__producto">
        <h1>${producto.nombre || ''}</h1>
        <h2>Precio Unitario: $${producto.precio_unitario || ''}</h2>
        <h3>Cantidad en Stock: ${producto.cantidad_real || ''}</h3>
        <div class="descripcion__producto">
          <h3>Descripción</h3>
          <ul>
            <li>Presentación: ${producto.descripcion?.presentacion || ''}</li>
            <li>Dosis: ${producto.descripcion?.dosis || ''}</li>
            <li>Vía de administración: ${producto.descripcion?.via_administracion || ''}</li>
            <li><strong>Detalles:</strong> ${producto.descripcion?.descripcion || ''}</li>
          </ul>
        </div>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity()"><i class="fas fa-minus"></i></button>
          <input type="number" id="quantity" value="1" min="1">
          <button onclick="increaseQuantity()"><i class="fas fa-plus"></i></button>
        </div>
        <button class="boton-agregar" onclick="agregarAlCarrito()">
          <i class="fas fa-shopping-cart"></i> Agregar al carrito
        </button>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', cargarDetalleProducto);

// Funciones dummy para los controles de cantidad y carrito
function decreaseQuantity() {
  const input = document.getElementById('quantity');
  if (input && input.value > 1) input.value--;
}
function increaseQuantity() {
  const input = document.getElementById('quantity');
  if (input && parseInt(input.value) < cantidadMaxima) input.value++;
}
function agregarAlCarrito() {
  alert('Producto agregado al carrito (funcionalidad demo)');
}

