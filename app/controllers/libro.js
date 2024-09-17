const db = require('../config/db.config.js');
const Libro = db.Libro;

const create = (req, res) => {
    let libro = {};

    try {
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        Libro.create(libro).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con id = " + result.id_libro,
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el libro!",
            error: error.message
        });
    }
};

const retrieveAllLibros = (req, res) => {
    Libro.findAll()
        .then(libroInfos => {
            res.status(200).json({
                message: "Libros obtenidos exitosamente!",
                libros: libroInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los libros!",
                error: error
            });
        });
};

const getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libro.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido exitosamente con id = " + libroId,
                libro: libro
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el libro!",
                error: error
            });
        });
};

const filteringByCategoria = (req, res) => {
    let categoria = req.query.categoria;

    Libro.findAll({
        attributes: ['id_libro', 'titulo', 'autor', 'categoria', 'cantidad_disponible', 'ubicacion'],
        where: { categoria: categoria }
    })
        .then(results => {
            res.status(200).json({
                message: "Libros filtrados por categoría = " + categoria,
                libros: results,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al filtrar los libros!",
                error: error
            });
        });
};

const pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const offset = page ? page * limit : 0;

        Libro.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginación completada! Parámetros de consulta: page = " + page + ", limit = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "libros": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error al realizar la paginación!",
            error: error.message,
        });
    }
};

const pagingfilteringsorting = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let categoria = req.query.categoria;
        const offset = page ? page * limit : 0;

        Libro.findAndCountAll({
            attributes: ['id_libro', 'titulo', 'autor', 'categoria', 'cantidad_disponible', 'ubicacion'],
            where: { categoria: categoria },
            order: [['titulo', 'ASC'], ['autor', 'DESC']],
            limit: limit,
            offset: offset
        })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginación, filtrado y orden completados! Parámetros: page = " + page + ", limit = " + limit + ", categoría = " + categoria,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "categoria": categoria,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "libros": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error al realizar la paginación!",
            error: error.message,
        });
    }
};

const updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No se encontró un libro con id = " + libroId,
                libro: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            };
            let result = await Libro.update(updatedObject, { returning: true, where: { id_libro: libroId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + libroId,
                libro: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el libro con id = " + req.params.id,
            error: error.message
        });
    }
};

const deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libro.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "No existe un libro con id = " + libroId,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + libroId,
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el libro con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Exporta las funciones del controlador
module.exports = {
    create,
    retrieveAllLibros,
    getLibroById,
    filteringByCategoria,
    pagination,
    pagingfilteringsorting,
    updateById,
    deleteById
};
