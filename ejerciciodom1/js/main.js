/**
 * PROYECTO: GESTIÓN DE METAS (CRUD)
 * Conceptos: DOM, ECMAScript, JSON, LocalStorage
 */

// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const inputMeta = document.querySelector('#goalInput');
const btnAgregar = document.querySelector('#btnAdd');
const listaContenedor = document.querySelector('#goalList');

// 2. ESTADO DE LA APLICACIÓN (Base de datos temporal en un Arreglo)
// Intentamos cargar de LocalStorage, si no hay nada, empezamos con un arreglo vacío.
let misMetas = JSON.parse(localStorage.getItem('metas_app')) || [];

// 3. FUNCIONES DEL CRUD

// --- CREATE (Crear) ---
const crearMeta = () => {
    const texto = inputMeta.value.trim();

    if (texto === "") {
        alert("¡Escribe una meta primero! ✍️");
        return;
    }

    // Creamos el objeto con la propiedad 'completada'
    const nuevaMeta = {
        id: Date.now(), // Genera un ID único basado en milisegundos
        texto: texto,
        completada: false
    };

    // Agregar al arreglo
    misMetas.push(nuevaMeta);
    
    // Guardar y refrescar la vista
    finalizarAccion();
    inputMeta.value = ""; // Limpiar el campo
};

// --- READ (Leer / Renderizar) ---
const renderizarInterfaz = () => {
    // Limpiamos la lista para evitar duplicados al redibujar
    listaContenedor.innerHTML = "";

    misMetas.forEach(meta => {
        // Creamos el elemento de lista
        const item = document.createElement('li');
        item.className = `goal-item ${meta.completada ? 'completed' : ''}`;
        
        // Inyectamos el contenido (Template Literals de ES6)
        item.innerHTML = `
            <span>${meta.texto}</span>
            <div>
                <button class="btn-check" onclick="cambiarEstado(${meta.id})">
                    ${meta.completada ? '✅' : '✔️'}
                </button>
                <button class="btn-edit" onclick="editarTexto(${meta.id})">✏️</button>
                <button class="btn-delete" onclick="borrarMeta(${meta.id})">🗑️</button>
            </div>
        `;
        
        listaContenedor.appendChild(item);
    });
};

// --- UPDATE (Actualizar estado y texto) ---

// Alternar entre completado o pendiente
const cambiarEstado = (id) => {
    misMetas = misMetas.map(meta => {
        if (meta.id === id) {
            // Retornamos una copia del objeto con el valor invertido (Inmutabilidad)
            return { ...meta, completada: !meta.completada };
        }
        return meta;
    });
    finalizarAccion();
};

// Editar el nombre de la meta
const editarTexto = (id) => {
    const metaAEditar = misMetas.find(m => m.id === id);
    const nuevoTexto = prompt("Edita tu meta:", metaAEditar.texto);

    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        misMetas = misMetas.map(m => 
            m.id === id ? { ...m, texto: nuevoTexto.trim() } : m
        );
        finalizarAccion();
    }
};

// --- DELETE (Borrar) ---
const borrarMeta = (id) => {
    // Filtramos el arreglo para quitar el ID seleccionado
    misMetas = misMetas.filter(meta => meta.id !== id);
    finalizarAccion();
};

// 4. FUNCIONES DE APOYO
const finalizarAccion = () => {
    // Convertimos el arreglo a JSON para guardarlo en el navegador
    localStorage.setItem('metas_app', JSON.stringify(misMetas));
    renderizarInterfaz();
};

// 5. EVENTOS (Listeners)
btnAgregar.addEventListener('click', crearMeta);

// Permitir agregar con la tecla Enter
inputMeta.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') crearMeta();
});

// Carga inicial al abrir la página
renderizarInterfaz();