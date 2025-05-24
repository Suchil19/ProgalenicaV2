document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let tarjetas__productos = document.querySelectorAll('.tarjetas__productos');

    tarjetas__productos.forEach(tarjetas__productos => {
        if (tarjetas__productos.dataset.id.includes(filter) || tarjetas__productos.innerText.toLowerCase().includes(filter)) {
            tarjetas__productos.style.display = "block";
        } else {
            tarjetas__productos.style.display = "none";
        }
    });
});