// Validacion de formulario de login
const {body} = require('express-validator');

const validationLogin = [
    body('email')
        .notEmpty().withMessage('Escribe tu email').bail()
        .isEmail().withMessage('Escribe un formato de correo válido'),
    body('password').notEmpty().withMessage('Escribe tu contraseña'),
]

module.exports = validationLogin;