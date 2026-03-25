function validar() {
u = document.getElementById("u").value;
c = document.getElementById("c").value;

const usu = "fulanito"
const contra = "12345"
 if (u == usu && c == contra) {
    alert("Bienvenido al sistema");
    n1 = prompt("Digite priemra nota");
    n2 = prompt("Digite segunda nota");
    n3 = prompt("Digite tercera nota");
    nota = (parseFloat(n1) + parseFloat(n2) + parseFloat(n3)) / 3;
    if (nota >= 3) {
        alert("🏆udted gano el periodo con promedio de: " + nota);
    }else{
        alert("usted perdio el periodo con promedio de: " + nota);
    }
 } else {
    alert("Usuario o contraseña incorrectos \n"
    + "no esta permitido entrar al sistema 🧨")
 }
}