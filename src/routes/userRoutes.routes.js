const express = require('express');
const router = express.Router();

// Validaciones
const {validationRegister, uploadFile, validationLogin, admin, usuarios} = require('../middlewares')

// Controlador
const { userController } = require('../controller')

// Formulario de Registro
router.get('/register', userController.getRegister);
// Procesar Registro
router.post('/register', uploadFile.single('avatar'), validationRegister, userController.register);

// Formulario de Login
router.get('/login', userController.getLogin);
// Procesar Login
router.post('/login', validationLogin, userController.login);

// Perfil de Usuario
router.get('/profile', usuarios || admin, userController.profile);

// Cerrar Sesion
router.get('/logout', userController.logout)

module.exports = router;