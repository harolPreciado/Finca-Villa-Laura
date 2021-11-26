//Se requieren todos los controladores creados
const userController = require('./userController');
const mainController = require('./mainController');

// Se exportan los controladores requeridos
module.exports = {
    userController,
    mainController,
};