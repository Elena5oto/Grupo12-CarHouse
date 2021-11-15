const express = require('express');
const router = express.Router();
const controllers = require('../controllers/mainController.js');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
let guestmiddleware = require('../middlewares/guest_middleware');
let authmiddleware = require('../middlewares/auth_middleware');





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    }, 
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
 var upload = multer({ storage: storage })
 

router.get('/', controllers.home);
router.get('/detail/:id', controllers.product);
router.get('/paquetes', controllers.list_of_products);

router.get('/carrito', controllers.carrito);

router.get('/paquetes/productsLoad', controllers.CargaEdicionProducto);
router.post('/paquetes/productsLoad', upload.single('image'), controllers.cargarProducto);
router.get('/paquetes/producto/productsEdit/:id', controllers.productsEdit);
router.put('/:id', upload.single('image'), controllers.update); 
router.delete('/:id', controllers.delete);

module.exports = router;