const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');

router.get('/', vendorController.getAll);

module.exports = router;

