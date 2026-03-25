function enviar() {
  n1 = parseInt(document.getElementById("n1").value)
    n2 = parseInt(document.getElementById("n2").value)
    s = n1 + n2
    r = n1 - n2
    m = n1 * n2
    d = n1 / n2
     alert("numero1: " + n1 + "\n"
         + "numero2: " + n2 + "\n"
         + n1 + "  + " + n2 + " = " + s + "\n"
          + n1 + " - " + n2 + " = " + r + "\n"
          + n1 + " * " + n2 + " = " + m + "\n"
          + n1 + " / " + n2 + " = " + d)
}