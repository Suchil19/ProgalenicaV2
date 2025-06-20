let users = [];
const API_URL = 'https://progalenica-back.onrender.com/progalenica/usuarios/';

// Función para crear una fila de usuario
const createUserRow = (usuario) => {
    const id = usuario.id || usuario._id || usuario.id_usuario;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td data-label="Nombre">${usuario.nombre} ${usuario.apellido_paterno || ''}</td>
        <td data-label="Correo">${usuario.email || 'No proporcionado'}</td>
        <td data-label="Rol">${usuario.tipo_usuario || 'Usuario'}</td>
        <td data-label="Editar">
            <a href="editar-usuario.html?id=${id}" title="Editar usuario">
              <span class="material-symbols-outlined">edit</span>
            </a>
        </td>
        <td data-label="Borrar">
            <span class="material-symbols-outlined" onClick="eliminarUsuario('${id}')" title="Eliminar usuario">
                delete
            </span>
        </td>
    `;
    return row;
};

// Función para renderizar la tabla
const renderUsersTable = (usuariosArr = users) => {
    const tableBody = document.querySelector('table tbody');
    if (!tableBody) {
        console.error('No se encontró el tbody de la tabla');
        return;
    }
    
    tableBody.innerHTML = '';
    
    if (usuariosArr.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5" style="text-align:center">No hay usuarios registrados</td>';
        tableBody.appendChild(row);
        return;
    }
    
    usuariosArr.forEach(usuario => {
        const row = createUserRow(usuario);
        tableBody.appendChild(row);
    });
};

// Función para obtener todos los usuarios
const getAllUsers = async () => {
    try {
        document.getElementById('preloader').style.display = 'block';
        
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Error al obtener los usuarios');
        }
        
        users = result.data || [];
        console.log('Usuarios obtenidos:', users);
        renderUsersTable();
        
    } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        alert('Error al cargar los usuarios: ' + error.message);
    } finally {
        document.getElementById('preloader').style.display = 'none';
    }
};

// Función para eliminar usuario
window.eliminarUsuario = async (id) => {
    if (!id || !confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Error al eliminar el usuario');
        }
        
        alert('Usuario eliminado correctamente');
        getAllUsers(); // Recargar la lista
        
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario: ' + error.message);
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    getAllUsers();
    
    // Opcional: agregar búsqueda si existe el input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = users.filter(user => 
                (user.nombre && user.nombre.toLowerCase().includes(term)) ||
                (user.email && user.email.toLowerCase().includes(term)) ||
                (user.tipo_usuario && user.tipo_usuario.toLowerCase().includes(term))
            );
            renderUsersTable(filtered);
        });
    }
});