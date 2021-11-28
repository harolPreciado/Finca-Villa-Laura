function usuariosMiddle(req, res, next) {
    if(req.session.usuarioLogueado === undefined){
        console.log('Debes registrarte como Usuario')
        res.redirect('/user/register')
    }else{
        console.log('Esta registrado como usuario')
        next();
    }
}

module.exports = usuariosMiddle;