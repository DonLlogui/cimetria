function verificar() {
   e = parseInt(document.getElementById("e").value);
    n = document.getElementById("n").value;  
    if (e >= 18) {
        alert("señor(@): " + n + " Usted es mayor de edad" + " con " + e + " años");
    }else {
            alert("señor(@): " + n + " Usted es menor de edad con " + e + " años");
        }
}