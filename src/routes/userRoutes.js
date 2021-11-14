const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

const storageUser = multer.diskStorage({
    destination: (req, file, cbUser) => {
        cbUser(null, './public/images/users')
    }, 
    filename: function (req, file, cbUser) {
        cbUser(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
     }
 });
 var uploadUser = multer({ storage: storageUser })


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

router.get('/login_register', userController.login_register);
router.post('/login_register/register',validacionesRegister, uploadUser.single('image'), userController.loadRegister);
router.post('/login_register/login',validacionesLogin, userController.loginValidator);

module.exports = router;