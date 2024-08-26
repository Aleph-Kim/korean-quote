const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.post('/create', quoteController.createQuote);
router.get('/random', quoteController.randomQuote);

module.exports = router;
