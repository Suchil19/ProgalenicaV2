// Script para precargar y actualizar producto
const API_URL = 'https://progalenica-back.onrender.com/progalenica/productos/';
const defaultImg = 'https://res.cloudinary.com/dfvrlkbsv/image/upload/v1750375615/composicion-colorida-nuevo-producto-diseno-plano_23-2147927006_bmoj0g.avif';

// Obtener el id del producto desde el query param
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

async function precargarProducto() {
  const id = getProductIdFromUrl();
  if (!id) {
    alert('No se proporcionó ID de producto');
    return;
  }
  try {
    const res = await fetch(API_URL + id);
    const result = await res.json();
    if (!result.success) throw new Error(result.message || 'No se encontró el producto');
    const producto = result.data;
    document.getElementById('nombre').value = producto.nombre || '';
    document.getElementById('laboratorio').value = producto.laboratorio || '';
    document.getElementById('precio_unitario').value = producto.precio_unitario || '';
    document.getElementById('cantidad_real').value = producto.cantidad_real || '';
    document.getElementById('codigo_barras').value = producto.codigo_barras || '';
    document.getElementById('presentacion').value = producto.descripcion?.presentacion || '';
    document.getElementById('dosis').value = producto.descripcion?.dosis || '';
    document.getElementById('via_administracion').value = producto.descripcion?.via_administracion || '';
    document.getElementById('descripcion_detalle').value = producto.descripcion?.descripcion || '';
    // No precargamos imagen file, solo mostramos preview si existe
    if(producto.imagen) {
      let imgPreview = document.createElement('img');
      imgPreview.src = producto.imagen;
      imgPreview.alt = 'Imagen actual';
      imgPreview.style.maxWidth = '120px';
      imgPreview.style.display = 'block';
      imgPreview.style.margin = '10px 0';
      document.getElementById('imagen').insertAdjacentElement('afterend', imgPreview);
    }
  } catch (err) {
    alert('Error al cargar producto: ' + err.message);
  }
}

document.addEventListener('DOMContentLoaded', precargarProducto);

document.getElementById('form-producto').addEventListener('submit', async function(e) {
  e.preventDefault();
  const id = getProductIdFromUrl();
  if (!id) return alert('No se proporcionó ID de producto');
  const imagenInput = document.getElementById('imagen');
  let imagen = '';
  if (imagenInput.files && imagenInput.files[0]) {
    // Aquí deberías subir la imagen y obtener la URL real, por ahora solo el nombre
    imagen = imagenInput.files[0].name;
  } else {
    // Si no se selecciona nueva imagen, mantener la actual o poner default
    const imgPreview = imagenInput.nextElementSibling;
    imagen = (imgPreview && imgPreview.tagName === 'IMG') ? imgPreview.src : defaultImg;
  }
  const data = {
    nombre: document.getElementById('nombre').value,
    laboratorio: document.getElementById('laboratorio').value,
    precio_unitario: parseFloat(document.getElementById('precio_unitario').value),
    cantidad_real: parseInt(document.getElementById('cantidad_real').value),
    codigo_barras: document.getElementById('codigo_barras').value,
    descripcion: {
      presentacion: document.getElementById('presentacion').value,
      dosis: document.getElementById('dosis').value,
      via_administracion: document.getElementById('via_administracion').value,
      descripcion: document.getElementById('descripcion_detalle').value
    },
    imagen: imagen
  };
  try {
    const response = await fetch(API_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if(result.success) {
      alert('Producto actualizado correctamente');
      window.location.href = './productos.html';
    } else {
      alert(result.message || 'Error al actualizar el producto');
    }
  } catch (err) {
    alert('Error de conexión o de servidor');
  }
});
