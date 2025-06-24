document.getElementById('busqueda').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let filas = document.querySelectorAll('tbody tr'); 

    filas.forEach(fila => {
        if (
            fila.dataset.id?.toLowerCase().includes(filter) ||
            fila.innerText.toLowerCase().includes(filter)
        ) {
            fila.style.display = "table-row";
        } else {
            fila.style.display = "none";
        }
    });
});