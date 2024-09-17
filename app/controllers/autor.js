const db = require('../config/db.config.js');
const Autor = db.Autor;

const create = async (req, res) => {
    let autor = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nacionalidad: req.body.nacionalidad,
        fecha_nacimiento: req.body.fecha_nacimiento,
    };

    try {
        const result = await Autor.create(autor);
        res.status(201).json({
            message: "Autor creado exitosamente con id = " + result.id_autor,
            autor: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el autor!",
            error: error.message
        });
    }
};

const retrieveAllAutores = async (req, res) => {
    try {
        const autorInfos = await Autor.findAll();
        res.status(200).json({
            message: "Autores obtenidos exitosamente!",
            autores: autorInfos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener los autores!",
            error: error.message
        });
    }
};

const getAutorById = async (req, res) => {
    const autorId = req.params.id;
    try {
        const autor = await Autor.findByPk(autorId);
        if (!autor) {
            return res.status(404).json({
                message: "No se encontró un autor con id = " + autorId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Autor obtenido exitosamente con id = " + autorId,
            autor: autor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al obtener el autor!",
            error: error.message
        });
    }
};

const filteringByNacionalidad = async (req, res) => {
    const nacionalidad = req.query.nacionalidad;

    try {
        const results = await Autor.findAll({
            attributes: ['id_autor', 'nombre', 'apellido', 'nacionalidad', 'fecha_nacimiento'],
            where: { nacionalidad: nacionalidad }
        });
        res.status(200).json({
            message: "Autores filtrados por nacionalidad = " + nacionalidad,
            autores: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al filtrar los autores!",
            error: error.message
        });
    }
};

const pagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10; // Default limit
        const offset = page * limit;

        const data = await Autor.findAndCountAll({ limit, offset });
        const totalPages = Math.ceil(data.count / limit);
        res.status(200).json({
            message: "Paginación completada! Parámetros de consulta: page = " + page + ", limit = " + limit,
            data: {
                totalItems: data.count,
                totalPages: totalPages,
                limit: limit,
                currentPageNumber: page + 1,
                currentPageSize: data.rows.length,
                autores: data.rows
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al realizar la paginación!",
            error: error.message,
        });
    }
};

const pagingfilteringsorting = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10; // Default limit
        const nacionalidad = req.query.nacionalidad;
        const offset = page * limit;

        const data = await Autor.findAndCountAll({
            attributes: ['id_autor', 'nombre', 'apellido', 'nacionalidad', 'fecha_nacimiento'],
            where: { nacionalidad: nacionalidad },
            order: [['nombre', 'ASC'], ['apellido', 'DESC']],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(data.count / limit);
        res.status(200).json({
            message: "Paginación, filtrado y orden completados! Parámetros: page = " + page + ", limit = " + limit + ", nacionalidad = " + nacionalidad,
            data: {
                totalItems: data.count,
                totalPages: totalPages,
                limit: limit,
                nacionalidad: nacionalidad,
                currentPageNumber: page + 1,
                currentPageSize: data.rows.length,
                autores: data.rows
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al realizar la paginación!",
            error: error.message,
        });
    }
};

const updateById = async (req, res) => {
    const autorId = req.params.id;
    try {
        const autor = await Autor.findByPk(autorId);
        if (!autor) {
            return res.status(404).json({
                message: "No se encontró un autor con id = " + autorId,
                error: "404"
            });
        }
        
        const updatedObject = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            nacionalidad: req.body.nacionalidad,
            fecha_nacimiento: req.body.fecha_nacimiento
        };

        const result = await Autor.update(updatedObject, { where: { id_autor: autorId }, returning: true });

        res.status(200).json({
            message: "Autor actualizado exitosamente con id = " + autorId,
            autor: result[1][0] // The updated author object
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el autor con id = " + autorId,
            error: error.message
        });
    }
};

const deleteById = async (req, res) => {
    const autorId = req.params.id;
    try {
        const autor = await Autor.findByPk(autorId);
        if (!autor) {
            return res.status(404).json({
                message: "No existe un autor con id = " + autorId,
                error: "404",
            });
        }

        await autor.destroy();
        res.status(200).json({
            message: "Autor eliminado exitosamente con id = " + autorId,
            autor: autor,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el autor con id = " + autorId,
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
