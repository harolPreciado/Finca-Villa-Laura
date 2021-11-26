const {validationResult} = require('express-validator')
const userController = {
    getRegister: function(req, res, next) {
        return res.render('register');
    },
    register: function(req, res, next) {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),  //mapped convierte en array el objeto literal
                oldData: req.body,
            })
        }
        return res.send('Ok las validaciones pasaron y no tienes errores')
    },
    login: function(req,res, next) {
        return res.render('login');
    },
    profile: function(req,res, next) {
        return res.render('profile');
    },
}

module.exports = userController;