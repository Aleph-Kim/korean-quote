const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/create', quoteController.createQuote);

module.exports = router;
