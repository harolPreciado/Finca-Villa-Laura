const express = require('express');
const router = express.Router();

router.use('/', require('./mainRoute.routes'))
router.use('/user', require('./userRoutes.routes'))

module.exports = router;