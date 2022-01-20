const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('../controllers/apiController.js')




// Users Api
router.get('/users', controllers.Users);
router.get('/users/:id', controllers.Detail_users);
// Product Api
router.get('/products', controllers.Products);
router.get('/products/:id', controllers.Detail_product);




module.exports = router;