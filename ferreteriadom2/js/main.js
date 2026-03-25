// 1. Estado inicial
let inventario = JSON.parse(localStorage.getItem('ferre_data')) || [];

const form = document.getElementById('productForm');
const contenedor = document.getElementById('listaProductos');


const mostrarProductos = () => {
    contenedor.innerHTML = "";

    inventario.forEach((prod) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/150?text=Sin+Imagen'">
            <div class="card-body">
                <h3>${prod.nombre}</h3>
                <p>$${prod.precio}</p>
                <button class="btn-borrar" onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
};

// 3. Agregar Producto (CREATE)
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const nuevoProducto = {
        id: Date.now(),
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        img: document.getElementById('imagen').value
    };

    inventario.push(nuevoProducto);
    guardarYRefrescar();
    form.reset(); // Limpia el formulario
});

// 4. Eliminar (DELETE)
const eliminarProducto = (id) => {
    if(confirm("¿Seguro que quieres eliminar este artículo?")) {
        inventario = inventario.filter(p => p.id !== id);
        guardarYRefrescar();
    }
};

// 5. Persistencia
const guardarYRefrescar = () => {
    localStorage.setItem('ferre_data', JSON.stringify(inventario));
    mostrarProductos();
};

// Ejecución inicial
mostrarProductos();