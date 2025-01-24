const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 템플릿에 로그인 여부 전달
router.use((req, res, next) => {
    res.locals.isAdmin = !!req.session.isAdmin;
    next();
});

/** 
 * 관리자 로그인
 */
router.get('/login', authController.login);

/**
 * 관리자 로그인 프로세스
 */
router.post('/login', authController.loginProc);

/**
 * 관리자 로그아웃
 */
router.get('/logout', authController.logout);

module.exports = router;
