const path = require('path');
const fs = require('fs');

function recordarme(req, res, next){
    next();
    if(req.cookies.recordarme !== undefined && req.session.usuarioLogueado == undefined){
        let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/users.json')));
        let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.cookies.recordarme)
        req.session.usuarioLogueado = usuarioLogueado;
    }
}

module.exports = recordarme;