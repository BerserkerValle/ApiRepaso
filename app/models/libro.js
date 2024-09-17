module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define('libro', {
      id_libro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      editorial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      anio_publicacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad_disponible: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ubicacion: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Libro;
  };
  