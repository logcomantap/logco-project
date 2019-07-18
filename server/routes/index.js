const routes = require("express").Router()
const User = require("./user.js")
const Image = require("./logo")

routes.use("/users", User)
// routes.use("/image", Image)

module.exports = routes