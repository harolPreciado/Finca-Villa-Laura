// 
const express=require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './public')));

// Configurar captura de informacion de formulario via POST
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routers
app.use('/', require('./routes'))
app.use('/user', require('./routes'))

// Configuración EJS View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;