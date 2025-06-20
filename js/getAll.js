// Cambia la URL por la de tu backend si es necesario
const API_URL = 'https://progalenica-back.onrender.com/progalenica/productos/';

async function cargarProductos() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener productos');
    }
    renderCards(result.data);
    
    // IMPORTANTE: Mostrar todas las tarjetas después de cargarlas
    setTimeout(() => {
      mostrarTodasLasCards();
    }, 100); // Pequeño delay para asegurar que el DOM se ha actualizado
    
  } catch (error) {
    console.error('Error al cargar productos:', error);
    const container = document.querySelector('.grid__container');
    if (container) {
      container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
}

function renderCards(productos) {
  const container = document.querySelector('.grid__container');
  if (!container) {
    console.error('No se encontró el contenedor .grid__container');
    return;
  }

  container.innerHTML = '';

  if (!productos || productos.length === 0) {
    container.innerHTML = '<p>No hay productos disponibles</p>';
    return;
  }

  productos.forEach(producto => {
    const urlDetalle = `./productos/detail.html?id=${producto.id_producto || ''}`;

    const link = document.createElement('a');
    link.href = urlDetalle;

    const card = document.createElement('div');
    card.className = 'tarjetas__productos';
    card.setAttribute('data-id', producto.nombre || '');
    card.setAttribute('data-lab', producto.laboratorio || '');
    
    // IMPORTANTE: Asegurar que la tarjeta sea visible por defecto
    card.style.display = 'block';

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre || ''}">
      <h1>${producto.nombre || ''}</h1>
      <p>${producto.descripcion?.descripcion || ''}</p>
      <h2>${producto.laboratorio || ''}</h2>
      <h3>Precio por caja: $${producto.precio_unitario || ''}</h3>
    `;

    link.appendChild(card);
    container.appendChild(link);
  });
}

// Función para mostrar todas las cards (equivale a presionar "Todos")
function mostrarTodasLasCards() {
  const cards = document.querySelectorAll('.tarjetas__productos');
  
  cards.forEach(card => {
    card.style.display = 'block';
  });
  
  // También activar visualmente el botón "Todos"
  const botones = document.querySelectorAll('.filtrar__laboratorios button');
  botones.forEach(btn => btn.classList.remove('active'));
  
  const botonTodos = document.querySelector('.filtrar__laboratorios button[onclick="filterProducts(\'all\')"]');
  if (botonTodos) {
    botonTodos.classList.add('active');
  }
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM cargado, iniciando carga de productos...');
  cargarProductos();
});