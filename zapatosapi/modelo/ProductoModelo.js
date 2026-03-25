const Conexion = require('./bd/Conexion');

class ProductoModelo {
    constructor() {
        if (ProductoModelo.instance) {
            return ProductoModelo.instance;
        }
        ProductoModelo.instance = this;
        this.conexion = new Conexion();
    }

    async obtenerProductos() {
        try {
            const query = 'SELECT * FROM productos';
            const result = await this.conexion.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    async obtenerProductoPorId(id) {
        try {
            const query = 'SELECT * FROM productos WHERE id = $1';
            const result = await this.conexion.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            throw error;
        }
    }

    async obtenerpornombre(producto) {
        try {
            const query = 'SELECT * FROM productos WHERE producto ILIKE $1';
            const result = await this.conexion.query(query, [`%${producto}%`]);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener producto por nombre:', error);
            throw error;
        }
    }

    async obtenercategoria(categoria) {
        try {
            const query = 'SELECT * FROM productos WHERE categoria ILIKE $1';
            const result = await this.conexion.query(query, [`%${categoria}%`]);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener producto por categoría:', error);
            throw error;
        }
    }

    async obtenerestilo(estilo) {
        try {
            const query = 'SELECT * FROM productos WHERE estilo ILIKE $1';
            const result = await this.conexion.query(query, [`%${estilo}%`]);
            return result.rows;
        } catch (error) {
            console.error('Error al obtener producto por estilo:', error);
            throw error;
        }
    }
    async crearProducto(articulo) {
        try {
            const query = 'INSERT INTO productos (producto,talla, color, estilo, categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [articulo.producto, articulo.talla, articulo.color, articulo.estilo, articulo.categoria];
            const result = await this.conexion.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    }
    
    async editarProducto(id, articulo) {
        try {
            const query = 'UPDATE productos SET producto = $1, talla = $2, color = $3, estilo = $4, categoria = $5 WHERE id = $6 RETURNING *';
            const values = [articulo.producto, articulo.talla, articulo.color, articulo.estilo, articulo.categoria, id];
            const result = await this.conexion.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error al editar producto:', error);
            throw error;
        }    

    }
    async eliminarProducto(id) {
        try {
            const query = 'DELETE FROM productos WHERE id = $1 RETURNING *';
            const result = await this.conexion.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
}
}

module.exports = ProductoModelo;
           