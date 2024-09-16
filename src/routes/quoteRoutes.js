const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

/**
 * 명언 랜덤 조회
 */
router.get('/random', quoteController.randomQuote);

/**
 * 오늘의 명언 조회
 */
router.get('/today', quoteController.todayQuote);

module.exports = router;
