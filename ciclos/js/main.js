function validar() {
    a = 1
    while (a <= 5) {
      alert("veces: " + a)
        a = a + 1  // abreviado a++
    }
}
function validarparm() {
    x = 10
    while (x <= 30) {
      alert("Par: " + x)
        x = x + 2  // abreviado a++
    }
}

function validarP() {
    alert("Ciclo Para")
    for (a = 1; a <= 5; a++) {
      alert("veces: " + a + " Para")
       // a = a + 1  // abreviado a++
    }
}

function validarparP() {
    alert("Ciclo Para")
    for (x = 10; x <= 30; x = x + 2) {
      alert("Par: " + x)
       // a = a + 1  // abreviado a++
    }
}

function validarimparm() {
    x = 11
    while (x <= 30) {
      alert("imPar: " + x)
        x = x + 2  // abreviado a++
    }
}

function validarimparP() {
    alert("Ciclo Para")
    for (x = 11; x <= 30; x = x + 2) {
      alert("imPar: " + x)
       // a = a + 1  // abreviado a++
    }
}

function multiplicar(){
    var i = 1;
var resultado = "";

while(i <= 12){
    resultado += `5 * ${i} = ${5 * i}\n`;
    i++;
}
// resultado = resultado + 
alert(resultado);
}