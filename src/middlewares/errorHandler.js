const { errorResponse } = require('../helpers/responseHelper');

/**
 * 에러 핸들러
 * @param {*} err 에러 객체
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 * @param {*} next 다음 미들웨어를 호출할 함수
 * @returns 
 */
const errorHandler = (err, req, res, next) => {
    console.error(err); // 에러 로깅

    return errorResponse(res, err.message || 'Internal Server Error', err.status || 500);
};

module.exports = errorHandler;
