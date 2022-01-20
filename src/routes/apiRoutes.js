const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('../controllers/apiController.js')




// Users Api
router.get('/users', controllers.Products);
router.get('/users/:id', controllers.Products);
// Product Api
router.get('/products', controllers.Products);
router.get('/products/:id', controllers.Products);




module.exports = router;