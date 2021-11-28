const validationRegister = require('./validationRegister')
const uploadFile = require('./multer')
const validationLogin = require('./validationLogin')
const admin = require('./admin')
const usuarios = require('./usuarios')

module.exports = {
    validationRegister,
    uploadFile,
    validationLogin,
    admin,
    usuarios
}