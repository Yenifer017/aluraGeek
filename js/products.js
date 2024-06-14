import { fetchProducts, deleteProduct, API_URL } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('productos-container');

    async function loadProducts() {
        try {
            const products = await fetchProducts('./db.json');
            productList.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('card');
                productCard.innerHTML = `
                    <img src="img/${product.imagen}" alt="${product.nombre}">
                    <div class="card-container--info">
                        <p>${product.nombre}</p>
                        <div class="card-container--value">
                            <p>Precio: $${product.precio.toFixed(2)}</p>
                            <button class="delete-btn" data-id="${product.id}">Eliminar</button>
                        </div>
                    </div>
                `;
                productList.appendChild(productCard);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.dataset.id;
                    await deleteProduct(id, API_URL);
                    loadProducts();
                });
            });
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    loadProducts();
});