const modelo = require('../modelo/RegistroUsuarioModelo');

class RegistroUsuarioControlador {
    /**
     * Maneja la creación de un nuevo usuario
     */
    async crear(req, res) {
        const {documento, nombres, telefono, correo, contrasena} = req.body;

        // 1. Validación básica de campos obligatorios
        if (!documento || !nombres || !telefono || !correo || !contrasena) {
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios (documento, nombres, telefono,correo, contrasena )'
            });
        }

        try {
            // 2. Verificar si el correo ya existe antes de intentar crear
            const usuarioExistente = await modelo.buscarPorCorreo(correo);
            if (usuarioExistente) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está registrado'
                });
            }

            // 3. Llamar al modelo para insertar (el modelo ya tiene el hash de bcrypt)
            const nuevoUsuario = await modelo.crear({
                documento,
                nombres,
                telefono,
                correo,
                contrasena
            });

            // 4. Respuesta exitosa
            return res.status(201).json({
                ok: true,
                msg: 'Usuario creado correctamente',
                data: {
                    documento: nuevoUsuario.documento,
                    nombres: nuevoUsuario.nombres,
                    telefono: nuevoUsuario.telefono,
                    correo: nuevoUsuario.correo
                }
            });

        } catch (error) {
            console.error('Error en CrearUsuarioControlador:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al crear usuario'
            });
        }
    }

    /**
     * Maneja la obtención de todos los usuarios
     */
    async listar(req, res) {
        try {
            const usuarios = await modelo.listarTodos();
            return res.json({
                ok: true,
                data: usuarios
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al obtener la lista de usuarios'
            });
        }
    }
}

// Exportamos la instancia
module.exports = new RegistroUsuarioControlador();