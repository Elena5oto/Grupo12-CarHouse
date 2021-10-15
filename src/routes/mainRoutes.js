const express = require('express');
const router = express.Router();
const controllers = require('../controllers/mainController.js');
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    }, 
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
let upload = multer({storage});

router.get('/', controllers.home);
router.get('/producto', controllers.product);
router.get('/paquetes', controllers.list_of_products);


router.get('/carrito', controllers.carrito);


router.get('/register', controllers.register);

router.get('/CargaEdicionProducto', controllers.CargaEdicionProducto);


router.get('/login' , controllers.login);


module.exports = router;