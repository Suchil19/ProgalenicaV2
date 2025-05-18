document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (card.dataset.id.includes(filter) || card.innerText.toLowerCase().includes(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});