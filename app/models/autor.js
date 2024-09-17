module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define('Autor', {
        id_autor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nacionalidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        tableName: 'autores',
        timestamps: false
    });

    return Autor;
};
