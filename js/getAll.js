// Cambia la URL por la de tu backend si es necesario
const API_URL = 'https://progalenica-back.onrender.com/progalenica/productos/';

async function cargarProductos() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Error al obtener productos');
    }
    console.log(result.data)
    renderCards(result.data);
  } catch (error) {
    document.getElementById('cards-container').innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function renderCards(productos) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  productos.forEach(producto => {
    // Puedes ajustar la URL de destino según tu lógica
    const urlDetalle = `./productos/ejemplo.html?id=${producto.id_producto || ''}`;

    // Crea el enlace
    const link = document.createElement('a');
    link.href = urlDetalle;

    // Crea la tarjeta
    const card = document.createElement('div');
    card.className = 'tarjetas__productos';
    card.setAttribute('data-id', producto.nombre || '');
    card.setAttribute('data-lab', producto.laboratorio || '');

    card.innerHTML = `
      <img src="${producto.imagen || 'https://via.placeholder.com/150'}" alt="${producto.nombre || ''}">
      <h1>${producto.nombre || ''}</h1>
      <p>${producto.descripcion?.descripcion || ''}</p>
      <h3>Precio por caja: $${producto.precio_unitario || ''}</h3>
    `;

    link.appendChild(card);
    container.appendChild(link);
  });
}

// Ejecutar al cargar la página
window.onload = cargarProductos;