const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

/**
 * 명언 생성
 * @param {string} body 명언 내용
 * @param {string} author 명언을 남긴 사람
 * @param {string} author_profile 명언을 남긴 사람에 대한 설명
 */
router.post('/', quoteController.createQuote);

/**
 * 명언 랜덤 조회
 */
router.get('/random', quoteController.randomQuote);

/**
 * 오늘의 명언 조회
 */
router.get('/today', quoteController.todayQuote);

module.exports = router;
