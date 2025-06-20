// Script para agregar nuevo producto
const API_URL = 'https://progalenica-back.onrender.com/progalenica/productos/';
const defaultImg = 'https://res.cloudinary.com/dfvrlkbsv/image/upload/v1750375615/composicion-colorida-nuevo-producto-diseno-plano_23-2147927006_bmoj0g.avif';

// Función para mostrar vista previa de la imagen
function setupImagePreview() {
  const imagenInput = document.getElementById('imagen');
  const previewContainer = document.createElement('div');
  previewContainer.id = 'image-preview-container';
  previewContainer.style.margin = '10px 0';
  
  const imgPreview = document.createElement('img');
  imgPreview.id = 'imagen-preview';
  imgPreview.src = defaultImg;
  imgPreview.style.maxWidth = '200px';
  imgPreview.style.maxHeight = '200px';
  imgPreview.style.display = 'block';
  imgPreview.style.borderRadius = '4px';
  
  previewContainer.appendChild(imgPreview);
  imagenInput.insertAdjacentElement('afterend', previewContainer);

  imagenInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(event) {
        imgPreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      imgPreview.src = defaultImg;
    }
  });
}

// Función para validar el formulario
function validateForm(data) {
  if (!data.nombre || data.nombre.trim().length < 2) {
    alert('El nombre del producto es requerido y debe tener al menos 2 caracteres');
    return false;
  }

  if (!data.laboratorio) {
    alert('Debes seleccionar un laboratorio');
    return false;
  }

  if (isNaN(data.precio_unitario) || data.precio_unitario <= 0) {
    alert('Ingrese un precio válido mayor a cero');
    return false;
  }

  if (isNaN(data.cantidad_real) || data.cantidad_real < 0) {
    alert('Ingrese una cantidad válida (número entero positivo)');
    return false;
  }

  return true;
}

// Función para limpiar el formulario
function resetForm() {
  document.getElementById('form-producto').reset();
  const imgPreview = document.getElementById('imagen-preview');
  if (imgPreview) {
    imgPreview.src = defaultImg;
  }
  document.getElementById('imagen').value = '';
}

// Función para subir la imagen (simulada)
async function uploadImage(file) {
  // En una implementación real, aquí subirías la imagen a un servicio como Cloudinary
  // Esta es una implementación simulada para propósitos de demostración
  return new Promise((resolve) => {
    setTimeout(() => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        resolve(defaultImg);
      }
    }, 500);
  });
}

// Manejar el envío del formulario
document.getElementById('form-producto').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Mostrar indicador de carga
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Guardando...';

  try {
    // Procesar imagen
    const imagenInput = document.getElementById('imagen');
    let imagenUrl = defaultImg;
    
    if (imagenInput.files && imagenInput.files[0]) {
      try {
        imagenUrl = await uploadImage(imagenInput.files[0]);
      } catch (error) {
        console.error('Error al subir imagen:', error);
        throw new Error('Error al procesar la imagen');
      }
    }

    // Preparar datos del producto
    const productoData = {
      nombre: document.getElementById('nombre').value.trim(),
      laboratorio: document.getElementById('laboratorio').value,
      precio_unitario: parseFloat(document.getElementById('precio_unitario').value),
      cantidad_real: parseInt(document.getElementById('cantidad_real').value),
      codigo_barras: document.getElementById('codigo_barras').value.trim() || null,
      descripcion: {
        presentacion: document.getElementById('presentacion').value.trim(),
        dosis: document.getElementById('dosis').value.trim(),
        via_administracion: document.getElementById('via_administracion').value.trim(),
        descripcion: document.getElementById('descripcion_detalle').value.trim()
      },
      imagen: imagenUrl
    };

    // Validar datos
    if (!validateForm(productoData)) {
      return;
    }

    // Enviar datos al servidor
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al guardar el producto');
    }

    // Éxito
    alert('Producto agregado correctamente');
    resetForm();
    
    // Redirigir a la lista de productos después de 1 segundo
    setTimeout(() => {
      window.location.href = './productos.html';
    }, 1000);

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Ocurrió un error al guardar el producto');
  } finally {
    // Restaurar el botón
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
});

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  setupImagePreview();
});