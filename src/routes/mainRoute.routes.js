const express = require('express');
const router = express.Router();

const { mainController } = require('../controller')

// Home
router.get('/', mainController.home);

module.exports = router;