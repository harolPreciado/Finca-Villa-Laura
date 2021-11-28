const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

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
        }else{
            let user = {
                nombre: req.body.fullName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                pais: req.body.country,
                avatar:  req.file ? req.file.filename : '',
                tipo: "usuario",
              }
              let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), {
                encoding: 'utf-8'
              });
              let users;
              if (archivoUsers == "") {
                users = [];
              } else {
                users = JSON.parse(archivoUsers);
              };
        
              users.push(user);
              usersJSON = JSON.stringify(users, null, 2);
              fs.writeFileSync(path.resolve(__dirname, '../data/users.json'), usersJSON);
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
            let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.body.email)
            return res.send(usuarioLogueado);
        }
    }, 
    profile: function(req,res, next) {
        return res.render('profile');
    },
}

module.exports = userController;