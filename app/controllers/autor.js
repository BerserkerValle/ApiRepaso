const db = require('../config/db.config.js');
const Autor = db.Autor;

const create = (req, res) => {
    let autor = {};

    try {
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento;

        Autor.create(autor).then(result => {
            res.status(200).json({
                message: "Autor creado exitosamente con id = " + result.id_autor,
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el autor!",
            error: error.message
        });
    }
};

const retrieveAllAutores = (req, res) => {
    Autor.findAll()
        .then(autorInfos => {
            res.status(200).json({
                message: "Autores obtenidos exitosamente!",
                autores: autorInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los autores!",
                error: error
            });
        });
};

const getAutorById = (req, res) => {
    let autorId = req.params.id;
    Autor.findByPk(autorId)
        .then(autor => {
            res.status(200).json({
                message: "Autor obtenido exitosamente con id = " + autorId,
                autor: autor
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el autor!",
                error: error
            });
        });
};

const filteringByNacionalidad = (req, res) => {
    let nacionalidad = req.query.nacionalidad;

    Autor.findAll({
        attributes: ['id_autor', 'nombre', 'apellido', 'nacionalidad', 'fecha_nacimiento'],
        where: { nacionalidad: nacionalidad }
    })
        .then(results => {
            res.status(200).json({
                message: "Autores filtrados por nacionalidad = " + nacionalidad,
                autores: results,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al filtrar los autores!",
                error: error
            });
        });
};

const pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const offset = page ? page * limit : 0;

        Autor.findAndCountAll({ limit: limit, offset: offset })
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
                        "autores": data.rows
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
        let nacionalidad = req.query.nacionalidad;
        const offset = page ? page * limit : 0;

        Autor.findAndCountAll({
            attributes: ['id_autor', 'nombre', 'apellido', 'nacionalidad', 'fecha_nacimiento'],
            where: { nacionalidad: nacionalidad },
            order: [['nombre', 'ASC'], ['apellido', 'DESC']],
            limit: limit,
            offset: offset
        })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginación, filtrado y orden completados! Parámetros: page = " + page + ", limit = " + limit + ", nacionalidad = " + nacionalidad,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "nacionalidad": nacionalidad,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "autores": data.rows
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
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No se encontró un autor con id = " + autorId,
                autor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            };
            let result = await Autor.update(updatedObject, { returning: true, where: { id_autor: autorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el autor con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Autor actualizado exitosamente con id = " + autorId,
                autor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el autor con id = " + req.params.id,
            error: error.message
        });
    }
};

const deleteById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autor.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "No existe un autor con id = " + autorId,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Autor eliminado exitosamente con id = " + autorId,
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el autor con id = " + req.params.id,
            error: error.message,
        });
    }
};

module.exports = {
    create,
    retrieveAllAutores,
    getAutorById,
    filteringByNacionalidad,
    pagination,
    pagingfilteringsorting,
    updateById,
    deleteById
};
