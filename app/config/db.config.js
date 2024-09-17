const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 //para mandar al para el servidor 

db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.Libro = require('../models/libro.js')(sequelize, Sequelize);
db.Autor = require('../models/autor.js')(sequelize, Sequelize);

module.exports = db;