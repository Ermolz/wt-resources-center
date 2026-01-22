const express = require('express');
const router = express.Router();
const chipsetController = require('../controllers/chipset.controller');

router.get('/', chipsetController.getAll);

module.exports = router;

