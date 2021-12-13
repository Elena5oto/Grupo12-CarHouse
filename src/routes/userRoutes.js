const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController.js');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');
let guestmiddleware = require('../middlewares/guest_middleware');
let authmiddleware = require('../middlewares/auth_middleware');
let is_admin_middleware = require('../middlewares/is_admin_middleware');

//validaciones
const validacionesRegister = [
    body("name").notEmpty().withMessage("Ingrese nombre completo"),
    body("email")
        .notEmpty().withMessage("Ingrese Email").bail()
        .isEmail().withMessage("Ingrese Email valido"),
    body("username").notEmpty().withMessage("ingrese un nombre de Usuario"),
    body("password").notEmpty().withMessage("Ingrese Contraseña"),
];

const validacionesLogin = [
    body("email").notEmpty().withMessage("Ingrese su correo electronico").bail()
                 .isEmail().withMessage("Ingrese un correo valido"),
    body("password").notEmpty().withMessage("ingresar contraseña"),
]


 const storageUser = multer.diskStorage({
    destination: (req, file, cbUser) => {
        cbUser(null, './public/images/users')
    }, 
    filename: function (req, file, cbUser) {
        cbUser(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
 var uploadUser = multer({ storage: storageUser })
 
router.get('/' , guestmiddleware, controllers.login_register);
router.get('/my_profile', authmiddleware, controllers.profile);
router.get('/logout', authmiddleware, controllers.logout);
router.get('/login_register' , guestmiddleware, controllers.login_register);
router.post('/login_register/register', guestmiddleware, uploadUser.single('image'),validacionesRegister, controllers.loadRegister);
router.post('/login_register/login' , guestmiddleware, validacionesLogin, controllers.loginValidator);


module.exports = router;