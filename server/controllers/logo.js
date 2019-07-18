const Logo = require('../models/logo')
// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient({
//     keyFilename: './vision_api.json'
// });

class LogoController{
    static create(req,res,next){
        console.log(req.body);
        if(req.body.logo.length <= 0){
            res.status(200).json({
                message: 'Logo tidak dikenal'
            })
        }
        else {
            Logo.create({
                name: req.body.logo[0],
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

    static fetchAll(){
        Logo.find()
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }

    


}

module.exports = LogoController