function validar() {
 var  h = 1
	var acu = 0
    var resultado = "";
    var ta = 0
    var tm = 0
    var tb = 0
    while (h <= 3) {
      var n= prompt("ingrese nombre del paciente")
        var fecha = new Date().toLocaleString()
       resultado += `Pacientes: ${n} Fecha: ${fecha} \n`;
         var triaje = parseInt(prompt("ingrese el triaje del paciente: /n 1 para Alto /n 2 para medio /n 3 para Bajo"))

       if(triaje == 1){
        ta = ta + 1
       }
       if(triaje == 2){
        tm = tm + 1
       }
         if(triaje == 3){
           tb = tb + 1
         }
      acu = acu + 1
      var pregunta = parseInt(prompt("desea continuar? 1 para si, 2 para no"))
      if (pregunta == 2) {
        h = 4
    }
}
alert("pacientes que entraron a urgencia " + acu + "\n" + resultado + "\n" + "Pacientes con triaje Alto: " + ta + "\n" + "Pacientes con triaje Medio: " + tm + "\n" + "Pacientes con triaje Bajo: " + tb ); 
}

//let fechaActual = new Date();