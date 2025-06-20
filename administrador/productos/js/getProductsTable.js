// Variables globales
let productos = [];
const API_URL = 'https://progalenica-back.onrender.com/progalenica/productos/';

// Función para formatear precio como moneda
const formatCurrency = (price) => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(price);
};

// Función para crear una fila de producto
const createProductRow = (producto) => {
    const id = producto.id || producto._id;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td data-label="Nombre">${producto.nombre}</td>
        <td data-label="Laboratorio">${producto.laboratorio || ''}</td>
        <td data-label="Presentación">${producto.presentacion || (producto.descripcion?.presentacion || '')}</td>
        <td data-label="Cantidad">${producto.cantidad_real}</td>
        <td data-label="Precio">${formatCurrency(producto.precio_unitario)}</td>
        <td data-label="Editar">
            <a href="editar-producto.html?id=${producto.id_producto || ''}" title="Editar producto">
              <span class="material-symbols-outlined">edit</span>
            </a>
        </td>
        <td data-label="Borrar">
            <span class="material-symbols-outlined" onClick="eliminarProducto('${producto.id_producto || producto.id || producto._id}')" title="Eliminar producto">
                delete
            </span>
        </td>
    `;
    console.log('Producto:', producto.id_producto);
    return row;
};

// Función para renderizar todos los productos en la tabla
const renderProductsTable = (productosArr = productos) => {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    productosArr.forEach(producto => {
        const row = createProductRow(producto);
        tbody.appendChild(row);
    });
};

// // Función para filtrar productos
// const filterProducts = (searchTerm) => {
//     const filtered = productos.filter(producto => 
//         producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         producto.presentacion.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     renderProductsTable(filtered);
// };

// Función para cargar todos los productos
const getAllProducts = async () => {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Error al cargar productos');
        productos = result.data;
        renderProductsTable();
        document.getElementById('preloader').style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los productos');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    getAllProducts();
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });
    }
});

const eliminarProducto = (id) => {
    if (!id) {
        console.error('ID no proporcionado');
        return;
    }
    
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Producto eliminado correctamente');
                getAllProducts();
            } else {
                alert(result.message || 'Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        });
    }
};