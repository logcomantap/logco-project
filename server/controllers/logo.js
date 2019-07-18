const Logo = require('../models/logo')
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './vision_api.json'
});

class LogoController{
    static create(req,res,next){
        console.log(req.body);
        
        Logo.create({
            name: req.body.logo,
            description: req.body.desc,
            picture: req.file.cloudStoragePublicUrl,
            user_id: req.decoded.id
        })
        .then(function(newdata){
            res.status(201).json(newdata)
        })
        .catch(next)
    }

    


}

module.exports = LogoController