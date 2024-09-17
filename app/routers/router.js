
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

// Crear un nuevo libro
router.post('/api/libros/create', libros.create);

// Obtener todos los libros
router.get('/api/libros/all', libros.retrieveAllLibros);

// Obtener un libro por id
router.get('/api/libros/onebyid/:id', libros.getLibroById);

// Filtrar libros por categoría
router.get('/api/libros/filteringbycategoria', libros.filteringByCategoria);

// Paginación de libros
router.get('/api/libros/pagination', libros.pagination);

// Paginación, filtrado y ordenación de libros
router.get('/api/libros/pagefiltersort', libros.pagingfilteringsorting);

// Actualizar un libro por id
router.put('/api/libros/update/:id', libros.updateById);

// Eliminar un libro por id
router.delete('/api/libros/delete/:id', libros.deleteById);

module.exports = router;

