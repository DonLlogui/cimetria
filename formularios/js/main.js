
function valida(){
    a = document.getElementById("tnombre").value
    b = document.getElementById("tid").value
    c = document.getElementById("tcorreo").value
    alert(a + " " + b + " "+ c)
    alert("nombres: " + a + "\n"
        + "ID: " + b + "\n"
        + "Correo: " + c
    )
}

function recibe(){
    n1 = parseInt(document.getElementById("n1").value)
    n2 = parseInt(document.getElementById("n2").value)
    r = n1 * n2
    alert("numero1: " + n1 + "\n"
         + "numero2: " + n2 + "\n"
         + n1 + "  * " + n2 + " = " + r)
}