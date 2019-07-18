const express = require('express');
const router = express.Router();
const WikiController = require('../controllers/wiki-controller');

router.post('/', WikiController.getDesc)

module.exports = router