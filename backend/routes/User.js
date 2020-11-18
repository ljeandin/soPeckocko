const express = require('express');
const router = express.Router(); //using the router function

const userCtrl = require('../controllers/User'); //path to the right controller

router.post('/signup', userCtrl.signup);//router.httpVerb('URL', path to the right controller)
router.post('/login', userCtrl.login);

module.exports = router;