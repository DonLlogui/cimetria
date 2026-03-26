const express = require('express');
const cors = require('cors');
const app = express();

const crearcliente = require('./vista/RutaCliente'); 
const gestionproducto = require('./vista/RutaProducto'); 

// Middlewares
app.use(cors({
    origin: '*', // Cambiar ['http://tu.com', 'http://yo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de credenciales si es necesario
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/app', crearcliente);//localhost:3333/app/
app.use('/app/productos/', gestionproducto); //localhost:3333/gestionproducto/


// Ruta base o principal
app.get('/', (req, res) => {
    res.send('API de zapatos funcionando');
});


// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});