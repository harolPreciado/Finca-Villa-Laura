function adminMiddle(req, res, next) {
    if(req.session.usuarioLogueado === undefined){
        console.log('Debes registrarte como Admin')
        res.redirect('/user/register')
    }else{
        console.log('Esta registrado como Admin')
        next();
    }
}

module.exports = adminMiddle;