// Validacion de formulario de login
const { body } = require('express-validator');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));

const validationLogin = [
    body('email')
        .notEmpty().withMessage('Escribe tu email').bail()
        .isEmail().withMessage('Escribe un formato de correo válido').bail()
        .custom((value) => {
            let usuarioALoguear = archivoUsuarios.find(usuario => usuario.email == value)
            if (usuarioALoguear != undefined) {
                return true
            }
            return false;
        }).withMessage('Usuario no se encuentra registrado...'),

    body('password')
        .notEmpty().withMessage('Escribe tu contraseña').bail()
        .custom((value, {req}) => {
            let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.body.email)
            if (bcrypt.compareSync(value, usuarioLogueado.password)) {
                return true
            }
            return false
        }).withMessage('Usurio o contraseña no coinciden'),
]

module.exports = validationLogin;