export const API_URL = "http://127.0.0.1:8080";

export async function fetchProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.productos; // para asegurarme que devuelva el array de productos
}

export async function createProduct(product) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const newProduct = await response.json();
    return newProduct;
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return response;
}