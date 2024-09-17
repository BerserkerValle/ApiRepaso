
let express = require('express');
let router = express.Router();

 //constasntes de rutas 
const customers = require('../controllers/controller.js');
const usuarios = require('../controllers/usuario.js');
const libros = require('../controllers/libro.js');


router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);


router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.retrieveAllLibros);
router.get('/api/libros/onebyid/:id', libros.getLibroById);
router.get('/api/libros/filteringbycategoria', libros.filteringByCategoria);
router.get('/api/libros/pagination', libros.pagination);
router.get('/api/libros/pagefiltersort', libros.pagingfilteringsorting);
router.put('/api/libros/update/:id', libros.updateById);
router.delete('/api/libros/delete/:id', libros.deleteById);

// Crear un nuevo autor
router.post('/api/autores/create', autoresController.create);

// Obtener todos los autores
router.get('/api/autores', autoresController.retrieveAllAutores);

// Obtener un autor por ID
router.get('/api/autores/:id', autoresController.getAutorById);

// Filtrar autores por nacionalidad
router.get('/api/autores/filter', autoresController.filteringByNacionalidad);

// Paginación de autores
router.get('/api/autores/pagination', autoresController.pagination);

// Paginación, filtrado y ordenación
router.get('/api/autores/pagingfilteringsorting', autoresController.pagingfilteringsorting);

// Actualizar un autor por ID
router.put('/api/autores/:id', autoresController.updateById);

// Eliminar un autor por ID
router.delete('/api/autores/:id', autoresController.deleteById);

module.exports = router;

