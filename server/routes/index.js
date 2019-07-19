const routes = require("express").Router()
const User = require("./user.js")
const Logo = require("./logo")

routes.use("/logos", Logo)
routes.use("/users", User)

module.exports = routes