document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q=ordenadores';

    fetch(url)
        .then(res => res.json())
        .then(data => displayMercadoLibre(data.results))
        .catch(error => console.error('Error fetching data:', error));
}

function displayMercadoLibre(items) {
    const content = document.getElementById('content');
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card col-md-3';
        card.innerHTML = `
            <img src="${item.thumbnail}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">Precio: $${item.price}</p>
                <a href="${item.permalink}" target="_blank" class="btn btn-primary">Ver Producto</a>
            </div>
        `;
        content.appendChild(card);
    });
}
