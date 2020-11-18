const express = require('express');
const router = express.Router(); //using the router function

const sauceCtrl = require('../controllers/Sauce'); //controller location
const auth = require('../middleware/auth'); //authentication middleware
const multer = require('../middleware/multer-config'); //multer-config middleware

router.get('', auth, sauceCtrl.getAllSauces); //router.httpVerb('URL', middleware(s), path to the right controller)
router.post('', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
