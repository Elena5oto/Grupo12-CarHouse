const express = require('express');
const router = express.Router();
const controllers = require('../controllers/mainController.js');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
let guestmiddleware = require('../middlewares/guest_middleware');
let authmiddleware = require('../middlewares/auth_middleware');
let is_admin_middleware = require('../middlewares/is_admin_middleware');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    }, 
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
 var upload = multer({ storage: storage })
 

 const validacionesProducts = [
    body("name").notEmpty().withMessage("Ingrese un nombre").bail()
    .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),

    body("title").notEmpty().withMessage("ingrese un Titulo").bail()
    .isLength({ min: 5 }).withMessage("El titulo debe tener al menos 5 caracteres"),

    body("description").notEmpty().withMessage("ingrese una Descripcion").bail()
    .isLength({ min: 20 }).withMessage("La descripcion debe tener al menos 20 caracteres"),

    body("image").custom((value, {req}) => {
            
        if(req.file != undefined){
            console.log(req.file.mimetype);
            if(req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png' || req.file.mimetype == 'image/gif'){
                console.log('asheeee');
                return true;
            }
        }
        return Promise.reject('Suba una imagen'); // return "non-falsy" value to indicate valid data"
        
}),

body("price").notEmpty().withMessage("ingrese un Precio").bail()
]

router.get('/', controllers.home);
router.get('/detail/:id', controllers.product);
router.get('/paquetes', controllers.list_of_products);


router.get('/carrito', controllers.carrito);


router.get('/paquetes/productsLoad', is_admin_middleware, controllers.CargaEdicionProducto);
router.post('/paquetes/productsLoad', is_admin_middleware, upload.single('image'), validacionesProducts, controllers.cargarProducto);
router.get('/paquetes/producto/productsEdit/:id', is_admin_middleware, controllers.productsEdit);
router.put('/:id', is_admin_middleware, upload.single('image'), controllers.update); 
router.delete('/:id', is_admin_middleware, controllers.delete);


module.exports = router;