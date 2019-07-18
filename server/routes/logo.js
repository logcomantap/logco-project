const express = require('express')
const logoRouter = express.Router()
const LogoController = require('../controllers/logo')
const authentication = require('../middlewares/authentication')
// const {authorization} = require('../middlewares/authorization')
// const imageUpload = require('../middlewares/imageUpload')
// const logoDetection = require('../helpers/logoDetection')

// logoRouter.use(authentication)
// logoRouter.post('/',imageUpload.multer.single('image'),imageUpload.sendUploadToGCS,logoDetection,LogoController.create)

module.exports = logoRouter