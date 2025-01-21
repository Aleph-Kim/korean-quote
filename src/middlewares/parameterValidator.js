const { param, validationResult } = require('express-validator');

/**
 * 관리자 상세 페이지 파라미터 검증
 */
const quoteDetail = [
    param('id').isInt().withMessage('올바르지 않은 접근입니다.')
];

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // 오류가 있을 경우
        const errorMessages = errors.array().map(err => err.msg).join(', ');

        // 이전 페이지 경로
        const previousPage = req.get('Referrer') || req.headers.referer || '/admin';

        // 에러 페이지로 리다이렉트
        return res.redirect(
            `/error/400?errors=${encodeURIComponent(errorMessages)}&from=${encodeURIComponent(previousPage)}`
        );
    }
    next();
}

module.exports = {
    quoteDetail,
    handleValidationResult
};
