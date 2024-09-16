const express = require('express');
const multer = require('multer');
const router = express.Router();

const adminController = require('../controllers/adminController');

/**
 * 명언 생성
 * @param {string} body 명언 내용
 * @param {string} author 명언을 남긴 사람
 * @param {string} author_profile 명언을 남긴 사람에 대한 설명
 */
router.post('/quote', adminController.createQuote);

/**
 * JSON 파일으로 명언 생성
 * @param {string} body 명언 내용
 * @param {string} author 명언을 남긴 사람
 * @param {string} author_profile 명언을 남긴 사람에 대한 설명
 */
router.post('/quoteWithJson', multer().single('file'), adminController.createQuoteWithJson);


module.exports = router;
