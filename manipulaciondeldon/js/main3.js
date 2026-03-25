// 1. Selección de elementos
const inputTarea = document.getElementById('inputTarea');
const btnAgregar = document.getElementById('btnAgregar');
const listaTareas = document.getElementById('listaTareas');
const contadorTareas = document.getElementById('contadorTareas');
const btnLimpiar = document.getElementById('btnLimpiarCompletadas');
const mensajeVacio = document.getElementById('mensajeVacio');
const fechaElemento = document.getElementById('fecha');
const filtros = document.querySelectorAll('.filtro-btn');

// 2. Mostrar fecha actual
const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
fechaElemento.innerText = new Date().toLocaleDateString('es-ES', opcionesFecha);

// 3. Array para almacenar tareas
let tareas = [];
let filtroActual = 'todas';

// 4. Función para guardar en LocalStorage
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// 5. Función para cargar desde LocalStorage
function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        renderizarTareas();
    }
}

// 6. Función para agregar tarea
function agregarTarea() {
    const texto = inputTarea.value.trim();
    
    if (texto !== '') {
        const nuevaTarea = {
            id: Date.now(),
            texto: texto,
            completada: false
        };
        
        tareas.push(nuevaTarea);
        guardarTareas();
        renderizarTareas();
        inputTarea.value = '';
        inputTarea.focus();
    }
}

// 7. Función para renderizar tareas en el DOM
function renderizarTareas() {
    listaTareas.innerHTML = '';
    
    // Filtrar tareas según el filtro actual
    let tareasFiltradas = tareas;
    if (filtroActual === 'activas') {
        tareasFiltradas = tareas.filter(t => !t.completada);
    } else if (filtroActual === 'completadas') {
        tareasFiltradas = tareas.filter(t => t.completada);
    }
    
    // Mostrar u ocultar mensaje de vacío
    if (tareasFiltradas.length === 0) {
        mensajeVacio.classList.add('visible');
    } else {
        mensajeVacio.classList.remove('visible');
    }
    
    // Crear elementos para cada tarea
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `tarea-item ${tarea.completada ? 'completada' : ''}`;
        li.dataset.id = tarea.id;
        
        li.innerHTML = `
            <div class="checkbox"></div>
            <span class="texto-tarea">${tarea.texto}</span>
            <button class="btn-eliminar"><i class="fas fa-trash"></i></button>
        `;
        
        listaTareas.appendChild(li);
    });
    
    // Actualizar contador
    const activas = tareas.filter(t => !t.completada).length;
    contadorTareas.innerText = `${activas} tarea${activas !== 1 ? 's' : ''} activa${activas !== 1 ? 's' : ''}`;
}

// 8. Función para alternar estado de tarea
function toggleTarea(id) {
    tareas = tareas.map(t => {
        if (t.id === id) {
            return { ...t, completada: !t.completada };
        }
        return t;
    });
    guardarTareas();
    renderizarTareas();
}

// 9. Función para eliminar tarea
function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    renderizarTareas();
}

// 10. Función para limpiar completadas
function limpiarCompletadas() {
    tareas = tareas.filter(t => !t.completada);
    guardarTareas();
    renderizarTareas();
}

// --- EVENTOS ---

// Agregar tarea con botón
btnAgregar.addEventListener('click', agregarTarea);

// Agregar tarea con Enter
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Delegación de eventos para la lista (mejor rendimiento)
listaTareas.addEventListener('click', (e) => {
    const tareaItem = e.target.closest('.tarea-item');
    
    if (!tareaItem) return;
    
    const id = parseInt(tareaItem.dataset.id);
    
    // Click en checkbox
    if (e.target.closest('.checkbox')) {
        toggleTarea(id);
    }
    
    // Click en botón eliminar
    if (e.target.closest('.btn-eliminar')) {
        // Animación de salida
        tareaItem.style.animation = 'fadeIn 0.3s reverse';
        setTimeout(() => {
            eliminarTarea(id);
        }, 300);
    }
});

// Filtros
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase activo de todos
        filtros.forEach(b => b.classList.remove('activo'));
        // Agregar clase activo al actual
        btn.classList.add('activo');
        // Actualizar filtro
        filtroActual = btn.dataset.filtro;
        renderizarTareas();
    });
});

// Limpiar completadas
btnLimpiar.addEventListener('click', limpiarCompletadas);

// Cargar tareas al iniciar
cargarTareas();