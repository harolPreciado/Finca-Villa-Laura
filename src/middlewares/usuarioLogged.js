function userLogged (req, res, next){
    res.locals.isLogged = true;
    if(req.session.usuarioLogueado){
        res.locals.isLogged = false;
        res.locals.userLogged = req.session.usuarioLogueado;
    }
    next();
}

module.exports = userLogged;