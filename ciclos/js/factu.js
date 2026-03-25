// Variables globales
let intentos = 0;
const MAX_INTENTOS = 3;

// Usuarios válidos
const usuarios = {
    "user1": "12345",
    "user2": "67890",
    "user3": "11223"
};

// Función para iniciar sesión
function iniciarSesion() {
    const usuario = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();
    const mensajeDiv = document.getElementById('mensaje');
    
    // Validar campos vacíos
    if (!usuario || !contraseña) {
        mostrarMensaje('Por favor complete todos los campos', 'error');
        return;
    }
    
    // Validar credenciales
    if (validarCredenciales(usuario, contraseña)) {
        // Credenciales correctas
        mostrarMensaje('✅ Iniciando sesión...', 'success');
        
        // Simular carga y luego entrar al sistema
        setTimeout(() => {
            entrarAlSistema(usuario);
        }, 1000);
    } else {
        // Credenciales incorrectas
        intentos++;
        
        if (intentos < MAX_INTENTOS) {
            const intentosRestantes = MAX_INTENTOS - intentos;
            mostrarMensaje(
                `❌ Credenciales incorrectas. Le quedan ${intentosRestantes} de ${MAX_INTENTOS} intentos válidos.`,
                'error'
            );
        } else {
            // 3 intentos fallidos
            mostrarMensaje(
                '❌ Demasiados intentos fallidos. No se encuentra en el sistema.',
                'error'
            );
            
            // Deshabilitar el formulario
            document.getElementById('loginForm').style.opacity = '0.5';
            document.getElementById('btnLogin').disabled = true;
            
            // Cerrar después de 3 segundos
            setTimeout(() => {
                window.close();
            }, 3000);
        }
    }
}

// Validar credenciales
function validarCredenciales(usuario, contraseña) {
    return usuarios[usuario] === contraseña;
}

// Mostrar mensaje
function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = 'mensaje ' + tipo;
}

// Entrar al sistema
function entrarAlSistema(usuario) {
    // Limpiar el formulario
    document.getElementById('loginForm').reset();
    
    // Mostrar mensaje de bienvenida
    alert(`¡Bienvenido al sistema, ${usuario}!`);
    
    // Iniciar el proceso de facturación
    setTimeout(() => {
        iniciarFacturacion();
    }, 500);
}

// Iniciar proceso de facturación
function iniciarFacturacion() {
    // Obtener información del cliente
    const idCliente = prompt("📋 Ingrese el ID del cliente:");
    
    if (idCliente === null) {
        alert("Operación cancelada.");
        return;
    }
    
    const nombreCliente = prompt("👤 Ingrese el nombre del cliente:");
    
    if (nombreCliente === null) {
        alert("Operación cancelada.");
        return;
    }
    
    // Array para almacenar productos
    const productos = [];
    let continuar = true;
    
    // Bucle para agregar productos
    while (continuar) {
        const producto = prompt("📦 Ingrese el nombre del producto:");
        
        if (producto === null) {
            alert("Operación cancelada.");
            return;
        }
        
        const cantidad = parseInt(prompt("🔢 Ingrese la cantidad del producto:"));
        
        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Cantidad inválida. Por favor ingrese un número mayor a 0.");
            continue;
        }
        
        const valorUnitario = parseFloat(prompt("💰 Ingrese el valor unitario del producto:"));
        
        if (isNaN(valorUnitario) || valorUnitario <= 0) {
            alert("Valor inválido. Por favor ingrese un número mayor a 0.");
            continue;
        }
        
        // Calcular subtotal
        const subtotal = cantidad * valorUnitario;
        
        // Agregar producto al array
        productos.push({
            nombre: producto,
            cantidad: cantidad,
            valorUnitario: valorUnitario,
            subtotal: subtotal
        });
        
        // Preguntar si desea agregar otro producto
        const respuesta = prompt("¿Desea agregar otro producto? (SI/NO)").toUpperCase();
        
        if (respuesta !== "SI" && respuesta !== "SÍ" && respuesta !== "S") {
            continuar = false;
        }
    }
    
    // Calcular totales
    const subtotalTotal = productos.reduce((sum, prod) => sum + prod.subtotal, 0);
    const iva = subtotalTotal * 0.19; // IVA del 19%
    const total = subtotalTotal + iva;
    
    // Generar factura
    generarFactura(idCliente, nombreCliente, productos, subtotalTotal, iva, total);
}

// Generar y mostrar factura
function generarFactura(idCliente, nombreCliente, productos, subtotal, iva, total) {
    // Obtener fecha y hora actual
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const horaFormateada = fecha.toLocaleTimeString('es-ES');
    
    // Construir factura
    let factura = "╔═══════════════════════════════════════════╗\n";
    factura += "║         🏥 HOSPITAL SI TE SALVAS        ║\n";
    factura += "║         📄 FACTURA DE VENTA             ║\n";
    factura += "╚═══════════════════════════════════════════╝\n\n";
    
    factura += `📅 Fecha: ${fechaFormateada}\n`;
    factura += `🕐 Hora: ${horaFormateada}\n\n`;
    
    factura += `🆔 ID Cliente: ${idCliente}\n`;
    factura += `👤 Cliente: ${nombreCliente}\n\n`;
    
    factura += "╔═══════════════════════════════════════════╗\n";
    factura += "║           DETALLE DE PRODUCTOS            ║\n";
    factura += "╠═══════════════════════════════════════════╣\n";
    
    productos.forEach((prod, index) => {
        factura += `║ ${String(index + 1).padStart(2)}. ${prod.nombre.padEnd(25)} ║\n`;
        factura += `║    Cantidad: ${String(prod.cantidad).padStart(3)} x $${prod.valorUnitario.toLocaleString('es-ES').padEnd(15)} ║\n`;
        factura += `║    Subtotal: $${prod.subtotal.toLocaleString('es-ES').padEnd(25)} ║\n`;
        if (index < productos.length - 1) {
            factura += "╠═══════════════════════════════════════════╣\n";
        }
    });
    
    factura += "╚═══════════════════════════════════════════╝\n\n";
    
    factura += "╔═══════════════════════════════════════════╗\n";
    factura += `║ Subtotal:      $${subtotal.toLocaleString('es-ES').padEnd(25)} ║\n`;
    factura += `║ IVA (19%):     $${iva.toLocaleString('es-ES').padEnd(25)} ║\n`;
    factura += `║ TOTAL:         $${total.toLocaleString('es-ES').padEnd(25)} ║\n`;
    factura += "╚═══════════════════════════════════════════╝\n\n";
    
    factura += "   ✨ ¡Gracias por su compra! ✨\n";
    factura += "   📞 Teléfono: (555) 123-4567\n";
    factura += "   🌐 www.hospitalsalvas.com\n";
    
    // Mostrar factura
    alert(factura);
    
    // Preguntar si desea generar otra factura
    const nuevaFactura = prompt("¿Desea generar otra factura? (SI/NO)").toUpperCase();
    
    if (nuevaFactura === "SI" || nuevaFactura === "SÍ" || nuevaFactura === "S") {
        iniciarFacturacion();
    } else {
        alert("¡Gracias por usar nuestro sistema de facturación!");
    }
}