const LoginModelo = require('../modelo/LoginModelo');

class LoginControlador {
  /**
   * Maneja el intento de inicio de sesión
   */
  async login(req, res) {
    const { correo, contrasena } = req.body;

    // 1. Validación de campos vacíos
    if (!correo || !contrasena) {
      return res.status(400).json({
        ok: false,
        msg: 'Por favor, ingrese correo y contraseña'
      });
    }

    try {
      // 2. Llamamos al modelo para verificar las credenciales
      const resultado = await LoginModelo.verificarCredenciales(correo, contrasena);

      // 3. Si el modelo devuelve un error (usuario no existe o clave mal)
      if (resultado.error) {
        return res.status(401).json({
          ok: false,
          msg: resultado.error // "Usuario no encontrado" o "Contraseña incorrecta"
        });
      }

      // 4. Si el login es exitoso
      return res.status(200).json({
        ok: true,
        msg: 'Inicio de sesión exitoso',
        usuario: resultado.usuario
      });

    } catch (error) {
      console.error('Error en LoginControlador:', error);
      return res.status(500).json({
        ok: false,
        msg: 'Error interno del servidor durante el login'
      });
    }
  }
}

// Exportamos la instancia única
module.exports = new LoginControlador();