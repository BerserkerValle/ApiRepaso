const db = require('../config/db.config.js');
const Usuario = db.Usuario;

exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.email = req.body.email;
        usuario.telefono = req.body.telefono;
        usuario.direccion = req.body.direccion;
        usuario.fecha_registro = req.body.fecha_registro;
        usuario.estado = req.body.estado;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.retrieveAllUsuarios = (req, res) => {
    // Obtener todos los usuarios
    Usuario.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "Obtenidos todos los usuarios exitosamente!",
                usuarios: usuarioInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener usuarios",
                error: error
            });
        });
}

exports.getUsuarioById = (req, res) => {
    // Obtener un usuario por ID
    let id_usuario = req.params.id;

    Usuario.findByPk(id_usuario)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Usuario obtenido exitosamente con id = " + id_usuario,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "Usuario no encontrado con id = " + id_usuario,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener usuario",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let id_usuario = req.params.id;
        let usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con id = " + id_usuario,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                direccion: req.body.direccion,
                estado: req.body.estado
            };

            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: id_usuario } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar usuario con id = " + req.params.id,
                    error: "No se pudo actualizar"
                });
            }

            res.status(200).json({
                message: "Usuario actualizado exitosamente con id = " + id_usuario,
                usuario: updatedObject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let id_usuario = req.params.id;
        let usuario = await Usuario.findByPk(id_usuario);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + id_usuario,
                error: "404"
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado exitosamente con id = " + id_usuario,
                usuario: usuario
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

