
const elTitulo = document.getElementById('titulo');
const elBoton = document.getElementById('miBoton');
const elBotonA = document.getElementById('BotonA');
const elBotonS = document.getElementById('BotonS');
const elBotonM = document.getElementById('BotonM');
const elBotonD = document.getElementById('BotonD'); 
const elBotonR = document.getElementById('BotonR');   


const inputRespuesta = document.getElementById('respuesta'); 
const inputT1 = document.getElementById('t1');
const inputT2 = document.getElementById('t2');


elBoton.addEventListener('click', () => {
    elTitulo.innerText = '¡Has hecho clic en el botón!';
    elTitulo.style.color = 'blue';
});


elBotonA.addEventListener('click', () => {
    elTitulo.style.color = '#dfe659';
});

function obtenerValores() {
    
    const n1 = parseFloat(inputT1.value);
    const n2 = parseFloat(inputT2.value);
    return { n1, n2 };
}

// Evento SUMAR
elBotonS.addEventListener('click', () => {
    const { n1, n2 } = obtenerValores();
    const resultado = Sumar(n1, n2);
    inputRespuesta.value = resultado; 
});

// Evento RESTAR
elBotonR.addEventListener('click', () => {
    const { n1, n2 } = obtenerValores();
    const resultado = Restar(n1, n2);
    inputRespuesta.value = resultado;
});

// Evento MULTIPLICAR
elBotonM.addEventListener('click', () => {
    const { n1, n2 } = obtenerValores();
    const resultado = Multiplicar(n1, n2);
    inputRespuesta.value = resultado;
});

// Evento DIVIDIR
elBotonD.addEventListener('click', () => {
    const { n1, n2 } = obtenerValores();
    const resultado = Dividir(n1, n2);
    inputRespuesta.value = resultado;
});

// --- TUS FUNCIONES MATEMÁTICAS ---

function Sumar(n1, n2) {
    // Validamos que sean números antes de operar
    if (isNaN(n1) || isNaN(n2)) return "Error: Ingresa números";
    return n1 + n2;
}

function Restar(n1, n2) {
    if (isNaN(n1) || isNaN(n2)) return "Error: Ingresa números";
    return n1 - n2;
}

function Multiplicar(n1, n2) {
    if (isNaN(n1) || isNaN(n2)) return "Error: Ingresa números";
    return n1 * n2;
}   

function Dividir(n1, n2) {
    if (isNaN(n1) || isNaN(n2)) return "Error: Ingresa números";
    if (n2 === 0) {
        return 'Error: No se puede dividir por cero';
    }   
    return n1 / n2;
}