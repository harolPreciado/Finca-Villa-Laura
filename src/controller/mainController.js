const { counterVisit } = require('../model')

const mainController = {
    home: function(req, res, next) {
        return res.render('home')
    },
    counterVisits: function(req, res, next) {
        if (req.session.numeroVisistas == undefined){
            req.session.numeroVisistas = 0;
        }
        req.session.numeroVisistas++;
        res.send('Session tiene el numero: ' + req.session.numeroVisistas);
    }
}

module.exports = mainController;