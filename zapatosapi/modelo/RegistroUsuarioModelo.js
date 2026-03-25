const Conexion = require('./bd/Conexion');
const bcrypt = require('bcrypt'); 

class RegistroUsuarioModelo {
    constructor() {
        if (RegistroUsuarioModelo.instance) {
            return RegistroUsuarioModelo.instance;
        }

        this.db = Conexion;
        RegistroUsuarioModelo.instance = this;
    }

    /**
     * Crea un nuevo usuario con contraseña hasheada
     */
    async crear(usuarios) {
      
        const {
            documento,
            nombres,
            telefono,
            correo,
            contrasena
        } = usuarios;

        try {
            // 2. Generar el Hash con salto de 10
            const saltRounds = 10;
            const contrasenaHasheada = await bcrypt.hash(contrasena, saltRounds);

            const query = `
        INSERT INTO usuarios (documento, nombres, telefono, correo, contrasena)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;

            // 3. Guardamos la versión segura (hasheada)
            const values = [documento, nombres, telefono, correo, contrasenaHasheada];

            const result = await this.db.query(query, values);
            return result.rows[0];
        } catch (err) {
            console.error('❌ Error al crear usuario:', err.message);
            throw err;
        }
    }

    /**

* Busca un usuario por su ID

*/

    async buscarPorId(documento) {

        const query = `SELECT * FROM usuarios WHERE documento = $1;`;



        try {

            const result = await this.db.query(query, [documento]);

            return result.rows[0] || null;

        } catch (err) {

            console.error('❌ Error al buscar usuario por ID:', err.message);

            throw err;

        }

    }



    /**
    
    * Busca un usuario por su correo
    
    */

    async buscarPorCorreo(correo) {

        const query = `SELECT * FROM usuarios WHERE correo = $1;`;



        try {

            const result = await this.db.query(query, [correo]);

            return result.rows[0] || null;

        } catch (err) {

            console.error('❌ Error al buscar usuario por correo:', err.message);

            throw err;

        }

    }



    /**
    
    * Lista todos los usuarios
    
    */

    async listarTodos() {

        const query = `SELECT * FROM usuarios ORDER BY documento ASC;`;



        try {

            const result = await this.db.query(query);

            return result.rows;

        } catch (err) {

            console.error('❌ Error al listar usuarios:', err.message);

            throw err;

        }

    }
}

module.exports = new RegistroUsuarioModelo();