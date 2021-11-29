const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const {validationResult} = require('express-validator')
const {users} = require('../model')

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
        }else{
            let userInDB = users.findByField('email', req.body.email);
            if(userInDB){
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya esta registrado'
                        }
                    },
                    oldData: req.body,
                })
            }
            let user = {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar:  req.file ? req.file.filename : '',
                tipo: "usuario",
              }
              users.create(user)
              res.redirect('login');
        }
    },
    getLogin: function(req,res, next) {
        return res.render('login');
    },
    login: function(req, res, next) {
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0) {
            return res.render('login', {
                errors: resultValidation.mapped(),  //mapped convierte en array el objeto literal
                oldData: req.body,
            })
        }else{
            let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
            let usuarioALoguearse = archivoUsuarios.find(usuario => usuario.email == req.body.email)
            req.session.usuarioLogueado = usuarioALoguearse;
            if(req.body.recordarme != undefined){
                res.cookie('recordarme', usuarioALoguearse.email, {maxAge: 1000 * 60})
            }
            return res.redirect('/user/profile');
        }
    }, 
    profile: function(req,res, next) {
        return res.render('profile');
    },
    logout: (req,res) =>{
        res.clearCookie('cookieRecordarme')
        req.session.destroy();
        res.redirect('/')
    }
}

module.exports = userController;