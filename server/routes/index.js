const routes = require("express").Router()
// const User = require("./user.js")
const Logo = require("./logo")

// routes.use("/", User)
routes.use("/logos", Logo)

module.exports = routes