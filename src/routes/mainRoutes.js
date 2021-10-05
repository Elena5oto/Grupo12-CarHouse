const express = require('express');
const router = express.Router();
const controllers = require('../controllers/mainController.js');

router.get('/', controllers.home);
router.get('/producto', controllers.product);
router.get('/paquetes', controllers.list_of_products);


router.get('/carrito', controllers.carrito);


router.get('/register', controllers.register);


module.exports = router;