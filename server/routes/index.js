const routes = require("express").Router()
const User = require("./user.js")
const Logo = require("./logo")
const wikipedia = require('./wikipedia');

routes.use("/logos", Logo)
routes.use("/users", User)
routes.use('/wikipedia', wikipedia)

module.exports = routes