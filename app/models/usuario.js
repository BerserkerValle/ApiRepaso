module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {
		id_usuario: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		nombre: {
			type: Sequelize.STRING
		},
		apellido: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		telefono: {
			type: Sequelize.STRING
		},
		direccion: {
			type: Sequelize.STRING
		},
		fecha_registro: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		estado: {
			type: Sequelize.INTEGER,
			validate: {
				isIn: [[0, 1]]
			},
			defaultValue: 1
		}
	});
	
	return Usuario;
}
