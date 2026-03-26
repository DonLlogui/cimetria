const URL_BASE = 'http://localhost:3333/app';

// ===== ELEMENTOS DEL DOM =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleSidebar = document.getElementById('toggle-sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.section');
const btnLogout = document.getElementById('btn-logout');

// Formulario producto
const productoForm = document.getElementById('producto-form');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const prodId = document.getElementById('prod-id');
const prodNombre = document.getElementById('prod-nombre');
const prodTalla = document.getElementById('prod-talla');
const prodColor = document.getElementById('prod-color');
const prodEstilo = document.getElementById('prod-estilo');
const prodCategoria = document.getElementById('prod-categoria');

// Buscadores
const searchNombre = document.getElementById('search-nombre');
const searchCategoria = document.getElementById('search-categoria');
const searchEstilo = document.getElementById('search-estilo');
const btnSearch = document.getElementById('btn-search');
const btnClear = document.getElementById('btn-clear');

// Tabla
const tableBody = document.getElementById('table-body');
const totalProductos = document.getElementById('total-productos');
const noResults = document.getElementById('no-results');

// Modal
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
const modalDelete = document.getElementById('modal-delete');
let productoAEliminar = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
    cargarProductos();
    setupEventListeners();
});

function verificarSesion() {
    // Aquí podrías validar token en localStorage
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('user-name').textContent = JSON.parse(usuario).nombres || 'Usuario';
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Sidebar
    toggleSidebar?.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    closeSidebar?.addEventListener('click', cerrarSidebar);
    overlay?.addEventListener('click', cerrarSidebar);
    
    // Navegación menú
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            sections.forEach(sec => sec.classList.add('hidden'));
            document.getElementById(section).classList.remove('hidden');
            
            if (window.innerWidth < 1024) cerrarSidebar();
        });
    });
    
    // Logout
    btnLogout?.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
    
    // Formulario producto
    productoForm?.addEventListener('submit', manejarFormulario);
    btnCancel?.addEventListener('click', limpiarFormulario);
    
    // Buscadores
    btnSearch?.addEventListener('click', buscarProductos);
    btnClear?.addEventListener('click', limpiarBuscadores);
    
    // Modal
    modalCancel?.addEventListener('click', () => modalConfirm.classList.add('hidden'));
    modalDelete?.addEventListener('click', confirmarEliminacion);
}

function cerrarSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// ===== CRUD PRODUCTOS =====
async function cargarProductos(filtros = {}) {
    try {
        let url = `${URL_BASE}/productos/todos`;
        
        if (filtros.nombre) {
            url = `${URL_BASE}/productos/nombre/${encodeURIComponent(filtros.nombre)}`;
        } else if (filtros.categoria) {
            url = `${URL_BASE}/productos/categoria/${encodeURIComponent(filtros.categoria)}`;
        } else if (filtros.estilo) {
            url = `${URL_BASE}/productos/estilo/${encodeURIComponent(filtros.estilo)}`;
        }
        
        const resp = await fetch(url);
        const data = await resp.json();
        
        if (data.ok) {
            renderizarTabla(data.data);
        } else {
            mostrarMensaje('Error: ' + data.msg, 'error');
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
        mostrarMensaje('Error de conexión con el servidor', 'error');
    }
}

function renderizarTabla(productos) {
    tableBody.innerHTML = '';
    
    if (!productos || productos.length === 0) {
        noResults.classList.remove('hidden');
        totalProductos.textContent = '0 productos';
        return;
    }
    
    noResults.classList.add('hidden');
    totalProductos.textContent = `${productos.length} producto${productos.length > 1 ? 's' : ''}`;
    
    productos.forEach(prod => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.producto}</td>
            <td>${prod.talla}</td>
            <td>${prod.color}</td>
            <td>${prod.estilo}</td>
            <td>${prod.categoria}</td>
            <td>
                <div class="actions">
                    <button class="btn-edit" data-id="${prod.id}">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-delete" data-id="${prod.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Event listeners para botones de tabla
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => editarProducto(e.currentTarget.dataset.id));
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => abrirModalEliminar(e.currentTarget.dataset.id));
    });
}

// ===== FORMULARIO =====
async function manejarFormulario(e) {
    e.preventDefault();
    
    const producto = {
        producto: prodNombre.value.trim(),
        talla: prodTalla.value.trim(),
        color: prodColor.value.trim(),
        estilo: prodEstilo.value.trim(),
        categoria: prodCategoria.value.trim()
    };
    
    const id = prodId.value;
    const esEdicion = !!id;
    
    try {
        const url = esEdicion 
            ? `${URL_BASE}/productos/editar/${id}`
            : `${URL_BASE}/productos/crear`;
        
        const method = esEdicion ? 'PUT' : 'POST';
        
        const resp = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        
        const data = await resp.json();
        
        if (data.ok) {
            mostrarMensaje(esEdicion ? '✅ Producto actualizado' : '✅ Producto creado', 'success');
            limpiarFormulario();
            cargarProductos();
        } else {
            mostrarMensaje('❌ Error: ' + data.msg, 'error');
        }
    } catch (error) {
        console.error('Error guardando producto:', error);
        mostrarMensaje('Error de conexión', 'error');
    }
}

function editarProducto(id) {
    // Primero obtenemos los datos del producto
    fetch(`${URL_BASE}/productos/${id}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.ok && data.data) {
                const prod = data.data;
                prodId.value = prod.id;
                prodNombre.value = prod.producto;
                prodTalla.value = prod.talla;
                prodColor.value = prod.color;
                prodEstilo.value = prod.estilo;
                prodCategoria.value = prod.categoria;
                
                formTitle.textContent = 'Editar Producto';
                btnSubmit.innerHTML = '<i class="fas fa-sync"></i> Actualizar';
                
                // Scroll al formulario
                document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
            }
        })
        .catch(err => {
            console.error('Error cargando producto:', err);
            mostrarMensaje('Error al cargar datos del producto', 'error');
        });
}

function limpiarFormulario() {
    productoForm.reset();
    prodId.value = '';
    formTitle.textContent = 'Nuevo Producto';
    btnSubmit.innerHTML = '<i class="fas fa-save"></i> Guardar Producto';
}

// ===== BÚSQUEDA =====
function buscarProductos() {
    const filtros = {};
    
    if (searchNombre.value.trim()) {
        filtros.nombre = searchNombre.value.trim();
    } else if (searchCategoria.value.trim()) {
        filtros.categoria = searchCategoria.value.trim();
    } else if (searchEstilo.value.trim()) {
        filtros.estilo = searchEstilo.value.trim();
    }
    
    cargarProductos(filtros);
}

function limpiarBuscadores() {
    searchNombre.value = '';
    searchCategoria.value = '';
    searchEstilo.value = '';
    cargarProductos();
}

// ===== ELIMINAR =====
function abrirModalEliminar(id) {
    productoAEliminar = id;
    modalConfirm.classList.remove('hidden');
}

async function confirmarEliminacion() {
    if (!productoAEliminar) return;
    
    try {
        const resp = await fetch(`${URL_BASE}/productos/eliminar/${productoAEliminar}`, {
            method: 'DELETE'
        });
        
        const data = await resp.json();
        
        if (data.ok) {
            mostrarMensaje('✅ Producto eliminado', 'success');
            cargarProductos();
        } else {
            mostrarMensaje('❌ Error: ' + data.msg, 'error');
        }
    } catch (error) {
        console.error('Error eliminando:', error);
        mostrarMensaje('Error de conexión', 'error');
    } finally {
        modalConfirm.classList.add('hidden');
        productoAEliminar = null;
    }
}

// ===== UTILIDADES =====
function mostrarMensaje(mensaje, tipo = 'info') {
    // Puedes implementar un toast/notification aquí
    alert(mensaje);
}