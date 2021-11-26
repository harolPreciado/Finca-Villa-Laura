const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Validaciones con Express-Validator
const {body} = require('express-validator');
const validations = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('country').notEmpty().withMessage('Tienes que seleccionar un país'),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if(!file){
            throw new Error('Tienes que subir una imagen');
        } else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(',')}`);
            }
        }
        return true;
    })
]

// Implementacion de Multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/public/img/avatars')
    },
    filename: (req, file, cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});
const uploadFile = multer({storage});

// Controlador
const { userController } = require('../controller')

// Formulario de Registro
router.get('/register', userController.getRegister);
// Procesar Registro
router.post('/register', uploadFile.single('avatar'), validations, userController.register);

// Formulario de Login
router.get('/login', userController.login);

// Perfil de Usuario
router.get('/profile/:userId', userController.profile);

module.exports = router;