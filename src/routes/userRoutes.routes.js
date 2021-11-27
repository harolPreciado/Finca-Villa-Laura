const express = require('express');
const router = express.Router();

// Validaciones
const {validationRegister, uploadFile, validationLogin} = require('../middlewares')

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
router.get('/profile/:userId', userController.profile);

module.exports = router;