const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

router.get('/', indexController.rendHome);
router.get('/about', indexController.rendAbout);
router.get('/contacts', indexController.rendContacts);



module.exports = router;