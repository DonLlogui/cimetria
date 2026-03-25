// ============================================
// GESTOR DE PRODUCTOS - CRUD CON JSON
// ============================================

// --- 1. VARIABLES GLOBALES ---
let productos = [];
let productoEditando = null;
let productoEliminando = null;

// --- 2. REFERENCIAS AL DOM ---
const formProducto = document.getElementById('formProducto');
const productoId = document.getElementById('productoId');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const categoria = document.getElementById('categoria');
const stock = document.getElementById('stock');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const tituloFormulario = document.getElementById('tituloFormulario');
const tablaProductos = document.getElementById('tablaProductos');
const contadorProductos = document.getElementById('contadorProductos');
const valorTotal = document.getElementById('valorTotal');
const mensajeVacio = document.getElementById('mensajeVacio');
const buscador = document.getElementById('buscador');
const btnExportar = document.getElementById('btnExportar');
const btnImportar = document.getElementById('btnImportar');
const inputArchivo = document.getElementById('inputArchivo');
const modalConfirmacion = document.getElementById('modalConfirmacion');
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
const btnCancelarEliminar = document.getElementById('btnCancelarEliminar');

// --- 3. FUNCIONES PRINCIPALES ---

/**
 * Cargar productos desde LocalStorage al iniciar
 * Simula la lectura de un archivo JSON local
 */
function cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    } else {
        // Datos de ejemplo si está vacío
        productos = [
            { id: 1, nombre: 'Laptop HP', precio: 999.99, categoria: 'Electrónica', stock: 50 },
            { id: 2, nombre: 'Camiseta Nike', precio: 29.99, categoria: 'Ropa', stock: 100 },
            { id: 3, nombre: 'Silla de Oficina', precio: 149.99, categoria: 'Hogar', stock: 30 }
        ];
        guardarProductos();
    }
    renderizarTabla();
}

/**
 * Guardar productos en LocalStorage
 * Simula la escritura en un archivo JSON
 */
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

/**
 * Renderizar la tabla de productos en el DOM
 * Operación READ (Leer)
 */
function renderizarTabla(filtro = '') {
    tablaProductos.innerHTML = '';
    
    // Filtrar productos si hay búsqueda
    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        p.categoria.toLowerCase().includes(filtro.toLowerCase())
    );
    
    // Mostrar u ocultar mensaje de vacío
    if (productosFiltrados.length === 0) {
        mensajeVacio.classList.add('visible');
    } else {
        mensajeVacio.classList.remove('visible');
    }
    
    // Crear filas para cada producto
    productosFiltrados.forEach(producto => {
        const fila = document.createElement('tr');
        fila.dataset.id = producto.id;
        
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.categoria}</td>
            <td>${producto.stock}</td>
            <td class="acciones-celda">
                <button class="btn-editar" onclick="editarProducto(${producto.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-eliminar" onclick="confirmarEliminar(${producto.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </td>
        `;
        
        tablaProductos.appendChild(fila);
    });
    
    // Actualizar estadísticas
    actualizarEstadisticas(productosFiltrados);
}

/**
 * Actualizar contador y valor total
 */
function actualizarEstadisticas(lista) {
    contadorProductos.innerText = `${lista.length} producto${lista.length !== 1 ? 's' : ''}`;
    
    const total = lista.reduce((sum, p) => sum + (p.precio * p.stock), 0);
    valorTotal.innerText = `Total: $${total.toFixed(2)}`;
}

/**
 * Crear o Actualizar producto
 * Operaciones CREATE (Crear) y UPDATE (Actualizar)
 */
function guardarProducto(e) {
    e.preventDefault();
    
    const datosProducto = {
        id: productoId.value ? parseInt(productoId.value) : Date.now(),
        nombre: nombre.value.trim(),
        precio: parseFloat(precio.value),
        categoria: categoria.value,
        stock: parseInt(stock.value)
    };
    
    if (productoEditando) {
        // UPDATE: Actualizar producto existente
        productos = productos.map(p => 
            p.id === productoEditando ? datosProducto : p
        );
        productoEditando = null;
        tituloFormulario.innerText = 'Nuevo Producto';
        btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar';
    } else {
        // CREATE: Crear nuevo producto
        productos.push(datosProducto);
    }
    
    guardarProductos();
    renderizarTabla();
    limpiarFormulario();
}

/**
 * Preparar formulario para editar
 */
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    
    if (producto) {
        productoEditando = id;
        productoId.value = producto.id;
        nombre.value = producto.nombre;
        precio.value = producto.precio;
        categoria.value = producto.categoria;
        stock.value = producto.stock;
        
        tituloFormulario.innerText = 'Editar Producto';
        btnGuardar.innerHTML = '<i class="fas fa-sync"></i> Actualizar';
        
        // Scroll al formulario
        document.querySelector('.formulario-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

/**
 * Confirmar eliminación con modal
 */
function confirmarEliminar(id) {
    productoEliminando = id;
    modalConfirmacion.classList.add('visible');
}

/**
 * Eliminar producto del DOM y del array
 * Operación DELETE (Eliminar)
 */
function eliminarProducto() {
    if (productoEliminando) {
        productos = productos.filter(p => p.id !== productoEliminando);
        guardarProductos();
        renderizarTabla();
        cerrarModal();
    }
}

/**
 * Limpiar formulario
 */
function limpiarFormulario() {
    formProducto.reset();
    productoId.value = '';
    productoEditando = null;
    tituloFormulario.innerText = 'Nuevo Producto';
    btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar';
}

/**
 * Cerrar modal
 */
function cerrarModal() {
    modalConfirmacion.classList.remove('visible');
    productoEliminando = null;
}

/**
 * Exportar productos a archivo JSON
 * Descarga un archivo .json al navegador
 */
function exportarJSON() {
    const datosJSON = JSON.stringify(productos, null, 2);
    const blob = new Blob([datosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `productos_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Importar productos desde archivo JSON
 * Lee un archivo .json del sistema local
 */
function importarJSON(e) {
    const archivo = e.target.files[0];
    
    if (archivo) {
        const lector = new FileReader();
        
        lector.onload = function(evento) {
            try {
                const datosImportados = JSON.parse(evento.target.result);
                
                if (Array.isArray(datosImportados)) {
                    productos = datosImportados;
                    guardarProductos();
                    renderizarTabla();
                    alert('✅ Productos importados correctamente');
                } else {
                    alert('❌ El archivo no tiene el formato correcto');
                }
            } catch (error) {
                alert('❌ Error al leer el archivo JSON');
                console.error(error);
            }
        };
        
        lector.readAsText(archivo);
    }
    
    // Resetear input para permitir importar el mismo archivo nuevamente
    inputArchivo.value = '';
}

/**
 * Buscar productos en tiempo real
 */
function buscarProducto(e) {
    renderizarTabla(e.target.value);
}

// --- 4. EVENT LISTENERS ---

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', cargarProductos);

// Guardar producto (Crear/Actualizar)
formProducto.addEventListener('submit', guardarProducto);

// Cancelar edición
btnCancelar.addEventListener('click', limpiarFormulario);

// Buscar productos
buscador.addEventListener('input', buscarProducto);

// Exportar JSON
btnExportar.addEventListener('click', exportarJSON);

// Importar JSON
btnImportar.addEventListener('click', () => inputArchivo.click());
inputArchivo.addEventListener('change', importarJSON);

// Confirmar eliminación
btnConfirmarEliminar.addEventListener('click', eliminarProducto);

// Cancelar eliminación
btnCancelarEliminar.addEventListener('click', cerrarModal);

// Cerrar modal al hacer click fuera
modalConfirmacion.addEventListener('click', (e) => {
    if (e.target === modalConfirmacion) {
        cerrarModal();
    }
});

// --- 5. FUNCIONES GLOBALES (para acceder desde HTML) ---
window.editarProducto = editarProducto;
window.confirmarEliminar = confirmarEliminar;