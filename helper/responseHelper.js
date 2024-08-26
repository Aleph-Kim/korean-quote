/**
 * 성공 응답
 * @param {*} res 응답 객체
 * @param {*} data 응답 데이터
 * @param {*} message 응답 메시지
 * @param {*} statusCode 상태코드
 * @returns 
 */
const successResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * 실패 응답
 * @param {*} res 응답 객체
 * @param {*} message 응답 메시지
 * @param {*} statusCode 상태코드
 * @param {*} errors 에러내용
 * @returns 
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = {}) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};
