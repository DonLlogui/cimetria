function calculo(){
    nf = parseInt(document.getElementById("nf").value)
    nc = document.getElementById("nc").value
    idc = parseInt(document.getElementById("idc").value)
    cant = parseInt(document.getElementById("cant").value)
    dp = document.getElementById("dp").value
    vu = parseInt(document.getElementById("vu").value)
    subtotal = cant * vu
    iva = subtotal * 0.19
    total = subtotal + iva
    alert("# Factura: " + nf + "\n"
        + "id del Cliente: " + idc + "\n"
        + "Cliente: " + nc + "\n"
        + "Cantidad: " + cant + "\n"
        + "Descripcion del producto: " + dp + "\n"
        + "Valor unitario: " + vu + "\n"
        + "Subtotal: " + subtotal + "\n"
        + "IVA: " + iva + "\n"
        + "Total a pagar: " + total)
    
}
