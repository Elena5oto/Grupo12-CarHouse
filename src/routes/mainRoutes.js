const express = require('express');
const router = express.Router();
const controllers = require('../controllers/mainController.js');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
let guestmiddleware = require('../middlewares/guest_middleware');
let authmiddleware = require('../middlewares/auth_middleware');




//validaciones
const validacionesRegister = [
    body("nombreCompleto").notEmpty().withMessage("Ingrese nombre completo"),
    body("email")
        .notEmpty().withMessage("Ingrese Email").bail()
        .isEmail().withMessage("Ingrese Email valido"),
    body("usuario").notEmpty().withMessage("ingrese un nombre de Usuario"),
    body("password").notEmpty().withMessage("Ingrese Contraseña"),
];

const validacionesLogin = [
    body("email").notEmpty().withMessage("Ingrese su correo electronico").bail()
                 .isEmail().withMessage("Ingrese un correo valido"),
    body("password").notEmpty().withMessage("ingresar contraseña"),
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/products')
    }, 
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
 var upload = multer({ storage: storage })

 const storageUser = multer.diskStorage({
    destination: (req, file, cbUser) => {
        cbUser(null, './public/images/users')
    }, 
    filename: function (req, file, cbUser) {
        cbUser(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
 var uploadUser = multer({ storage: storageUser })
 

router.get('/', controllers.home);
router.get('/detail/:id', controllers.product);
router.get('/paquetes', controllers.list_of_products);


router.get('/carrito', controllers.carrito);


//router.get('/register', controllers.register);

router.get('/login_register' , guestmiddleware, controllers.login_register);
router.post('/register', guestmiddleware, validacionesRegister, uploadUser.single('image'), controllers.loadRegister);
router.post('/login' , guestmiddleware, validacionesLogin, controllers.loginValidator);






router.get('/paquetes/productsLoad', controllers.CargaEdicionProducto);
router.post('/paquetes/productsLoad', upload.single('image'), controllers.cargarProducto);


//router.get('/login' , controllers.login);


router.get('/paquetes/producto/productsEdit/:id', controllers.productsEdit);
router.put('/:id', upload.single('image'), controllers.update); 


router.delete('/:id', controllers.delete);


//prueba




module.exports = router;