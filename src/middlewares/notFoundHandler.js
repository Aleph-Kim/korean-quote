const { errorResponse } = require('../helpers/responseHelper');

/**
 * 404 에러 핸들러
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 * @param {*} next 다음 미들웨어를 호출할 함수
 * @returns 
 */
const notFoundHandler = (req, res, next) => {
    return errorResponse(res, 'Resource not found', 404);
};

module.exports = notFoundHandler;
