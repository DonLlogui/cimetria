// 1. Selección de elementos del Panel de Control
const inputNombre = document.getElementById('inputNombre');
const inputColorFondo = document.getElementById('inputColorFondo');
const inputColorTexto = document.getElementById('inputColorTexto');
const inputPoder = document.getElementById('inputPoder');
const valorPoderSpan = document.getElementById('valorPoder');
const inputHabilidad = document.getElementById('inputHabilidad');
const btnAgregar = document.getElementById('btnAgregar');
const btnReiniciar = document.getElementById('btnReiniciar');

// 2. Selección de elementos de la Tarjeta (Donde se reflejan los cambios)
const tarjeta = document.getElementById('tarjeta');
const nombrePersonaje = document.getElementById('nombrePersonaje');
const textoPoder = document.getElementById('textoPoder');
const barraRelleno = document.getElementById('barraRelleno');
const listaHabilidades = document.getElementById('listaHabilidades');

// --- EVENTOS ---

// Evento 1: Cambiar nombre en tiempo real
inputNombre.addEventListener('input', () => {
    if(inputNombre.value.trim() === "") {
        nombrePersonaje.innerText = "Tu Nombre";
    } else {
        nombrePersonaje.innerText = inputNombre.value;
    }
});

// Evento 2: Cambiar color de fondo
inputColorFondo.addEventListener('input', () => {
    tarjeta.style.backgroundColor = inputColorFondo.value;
});

// Evento 3: Cambiar color de texto
inputColorTexto.addEventListener('input', () => {
    tarjeta.style.color = inputColorTexto.value;
    // Ajustamos el borde del avatar para que contraste
    document.getElementById('avatarCircle').style.borderColor = inputColorTexto.value;
});

// Evento 4: Cambiar nivel de poder (Barra de progreso)
inputPoder.addEventListener('input', () => {
    const valor = inputPoder.value;
    textoPoder.innerText = valor;
    valorPoderSpan.innerText = valor;
    barraRelleno.style.width = valor + '%';
    
    // Cambiar color de la barra según el poder (Lógica condicional)
    if(valor < 30) {
        barraRelleno.style.backgroundColor = '#e74c3c'; // Rojo
    } else if (valor < 70) {
        barraRelleno.style.backgroundColor = '#f1c40f'; // Amarillo
    } else {
        barraRelleno.style.backgroundColor = '#27ae60'; // Verde
    }
});

// Evento 5: Agregar habilidad a la lista
btnAgregar.addEventListener('click', () => {
    const nuevaHabilidad = inputHabilidad.value.trim();

    if (nuevaHabilidad !== "") {
        // 1. Crear el elemento li
        const li = document.createElement('li');
        li.innerText = nuevaHabilidad;
        
        // 2. Si es el primer elemento y dice "Sin habilidades...", lo borramos
        if (listaHabilidades.children[0] && listaHabilidades.children[0].innerText === "Sin habilidades aún...") {
            listaHabilidades.innerHTML = "";
        }

        // 3. Agregar el li a la lista ul
        listaHabilidades.appendChild(li);

        // 4. Limpiar el input
        inputHabilidad.value = "";
        inputHabilidad.focus();
    } else {
        alert("¡Escribe una habilidad primero!");
    }
});

// Evento 6: Reiniciar todo
btnReiniciar.addEventListener('click', () => {
    // Resetear inputs
    inputNombre.value = "";
    inputColorFondo.value = "#3498db";
    inputColorTexto.value = "#ffffff";
    inputPoder.value = 50;
    inputHabilidad.value = "";
    
    // Disparar manualmente los eventos o resetear el DOM directamente
    nombrePersonaje.innerText = "Tu Nombre";
    tarjeta.style.backgroundColor = "#3498db";
    tarjeta.style.color = "#ffffff";
    document.getElementById('avatarCircle').style.borderColor = "rgba(255,255,255,0.5)";
    
    textoPoder.innerText = "50";
    valorPoderSpan.innerText = "50";
    barraRelleno.style.width = "50%";
    barraRelleno.style.backgroundColor = "#f1c40f";

    listaHabilidades.innerHTML = "<li>Sin habilidades aún...</li>";
});