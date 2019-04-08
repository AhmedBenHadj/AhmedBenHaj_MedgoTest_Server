const express = require('express');
const wrap = require('co-express');
const controller = require('./controller');
const router=  express.Router();

router.post('/add',wrap(controller.addUser));
module.exports = router ;