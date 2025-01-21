const express = require('express');
const router = express.Router();
const errorController = require('../controllers/errorController');

/**
 * 명언 목록
 */
router.get('/400', errorController.serverError);


module.exports = router;