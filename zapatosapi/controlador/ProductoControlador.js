const modelo = require('../modelo/ProductoModelo');

class ProductoControlador {
    async obtenerProductos(req, res) {
        //const { t1: id } = req.params;
        try {
            const productos = await modelo.obtenerProductos();
            return res.status(200).json({
                ok: true,
                msg: 'Productos obtenidos correctamente',
                data: productos
            });
        } catch (error) {
            console.error('Error en ProductoControlador.obtenerProductos:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al obtener productos'
            });
        }
    }
    async obtenerProductoPorId(req, res) {
        const { id } = req.params;
        try {
            const producto = await modelo.obtenerProductoPorId(id);
            if (!producto) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                });
            }
            return res.status(200).json({
                ok: true,
                msg: 'Producto obtenido correctamente',
                data: producto
            });
        } catch (error) {
            console.error('Error en ProductoControlador.obtenerProductoPorId:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al obtener producto por ID'
            });
        }
    }

    async obtenerpornombre(req, res) {
        const { producto } = req.params;
        try {
            const productos = await modelo.obtenerpornombre(producto);
            if (!productos) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                });
            }
            return res.status(200).json({
                ok: true,
                msg: 'Producto obtenido correctamente',
                data: productos
            });
        } catch (error) {
            console.error('Error en ProductoControlador.obtenerpornombre:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al obtener producto por nombre'
            });
        }
    }
    async obtenercategoria(req, res) {
        const { categoria } = req.params;
        try {
            const productos = await modelo.obtenercategoria(categoria);
            if (!productos) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                });
            }
            return res.status(200).json({
                ok: true,
                msg: 'Producto obtenido correctamente',
                data: productos
            });
        } catch (error) {
            console.error('Error en ProductoControlador.obtenercategoria:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al obtener producto por categoría'
            });
        }
    }

    async obtenerestilo(req, res) {
        const { estilo } = req.params;
        try {
            const productos = await modelo.obtenerestilo(estilo);
            if (!productos) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                });
            }
            return res.status(200).json({
                ok: true,
                msg: 'Producto obtenido correctamente',
                data: productos
            });
        } catch (error) {
            console.error('Error en ProductoControlador.obtenerestilo:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al obtener producto por estilo'
            });
        }
    }
    async crearProducto(req, res) {
        const articulo = req.body; 
        try {
            const nuevoProducto = await modelo.crearProducto(articulo);
            return res.status(201).json({
                ok: true,
                msg: 'Producto creado correctamente',
                data: nuevoProducto
            });
        } catch (error) {
            console.error('Error en ProductoControlador.crearProducto:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al crear producto'
            });
        }
    }
    async editarProducto(req, res) {
        const { id } = req.params;
        const articulo = req.body;

        try {
            const productoEditado = await modelo.editarProducto(id, articulo);

            if (!productoEditado) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                });
            }

            return res.status(200).json({
                ok: true,
                msg: 'Producto editado correctamente',
                data: productoEditado
            });
        } catch (error) {
            console.error('Error en ProductoControlador.editarProducto:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al editar producto'
            });
        }
    }

    async eliminarProducto(req, res) {
        const { id } = req.params;

        try {
            const productoEliminado = await modelo.eliminarProducto(id);

            if (!productoEliminado) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                });
            }

            return res.status(200).json({
                ok: true,
                msg: 'Producto eliminado correctamente',
                data: productoEliminado
            });
        } catch (error) {
            console.error('Error en ProductoControlador.eliminarProducto:', error);
            return res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor al eliminar producto'
            });
        }
    }

}
module.exports = new ProductoControlador();