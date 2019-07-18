const routes = require("express").Router()
// const User = require("./user.js")
// const Image = require("./image.js")
const wikipedia = require('./wikipedia');

// routes.use("/", User)
// routes.use("/image", Image)
routes.use('/wikipedia', wikipedia)


module.exports = routes