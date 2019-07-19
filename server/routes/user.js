const router = require('express').Router()
const User = require('../controllers/user')

router.use('/register', User.register)
router.use('/login', User.login)

module.exports = router