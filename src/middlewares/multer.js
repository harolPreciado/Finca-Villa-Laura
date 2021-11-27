const path = require('path');
const multer = require('multer');

// Implementacion de Multer para subir archivos
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/public/img/avatars')
    },
    filename: (req, file, cb)=>{
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});
const uploadFile = multer({storage});

module.exports = uploadFile;