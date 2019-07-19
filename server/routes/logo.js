const express = require('express')
const logoRouter = express.Router()
const LogoController = require('../controllers/logo')
const authentication = require('../middlewares/authentication')
// const {authorization} = require('../middlewares/authorization')
const imageUpload = require('../middlewares/imageUpload')
const logoDetection = require('../helpers/logoDetection')
const WikiController = require('../helpers/wiki-controller')


logoRouter.use(authentication)
logoRouter.get('/all',LogoController.fetchAll)
logoRouter.get('/owner',LogoController.fetchOwner)
logoRouter.post('/',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,logoDetection,WikiController,LogoController.create)
logoRouter.delete('/',LogoController.delete)

module.exports = logoRouter