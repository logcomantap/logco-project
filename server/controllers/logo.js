const Logo = require('../models/logo')
// const vision = require('@google-cloud/vision');
// const client = new vision.ImageAnnotatorClient({
//     keyFilename: './vision_api.json'
// });

class LogoController{
    static create(req,res,next){
        console.log(req.body.logo[0]);
        console.log(req.decoded.id);
        
        console.log(req.body.desc);
        
        if(req.body.logo.length <= 0){
            res.status(200).json({
                message: 'Sorry logo tidak dikenali'
            })
        }
        else if(req.file.cloudStoragePublicUrl == undefined){
            res.status(200).json({
                message: "there's no file to upload"
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

    static fetchAll(req,res,next){
        Logo.find().sort({createdAt: -1})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }


    static fetchOwner(req,res,next){
        Logo.find({user_id : req.decoded.id}).sort({createdAt: -1})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Logo.findOneAndDelete({_id : req.params.id})
        .then(function(data){
            res.status(200).json(data)
        })
        .catch(next)
    }
    


}

module.exports = LogoController