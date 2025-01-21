const express = require('express');
const multer = require('multer');
const router = express.Router();
const parameterValidator = require('../middlewares/parameterValidator');
const adminController = require('../controllers/adminController');

/**
 * 명언 목록
 * @param {number} page - 현재 페이지
 * @param {number} pageSize - 페이지 당 데이터 수
 */
router.get('/', adminController.quoteList);

/**
 * 명언 상세
 * @param {number} id - 명언 PK
 */
router.get('/detail/:id', parameterValidator.quoteDetail, parameterValidator.handleValidationResult, adminController.quoteDetail);

/**
 * 명언 상세
 * @param {number} id - 명언 PK
 */
router.get('/create', adminController.createView);

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
