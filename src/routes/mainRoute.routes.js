const express = require('express');
const router = express.Router();

const { mainController } = require('../controller')

// Home
router.get('/', mainController.home);

// Contador de Visitas
router.get('/visit', mainController.counterVisits)

module.exports = router;