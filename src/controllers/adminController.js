const { successResponse, errorResponse } = require('../helpers/responseHelper');
const adminService = require('../services/adminService');

/**
 * 명언 생성
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 */
const createQuote = async (req, res, next) => {
    try {
        const quote = await adminService.createQuote(req.body);
        return successResponse(res, quote, "명언 데이터가 생성되었습니다.");
    } catch (err) {
        next(err)
    }
};

/**
 * JSON 파일로 명언 생성
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 */
const createQuoteWithJson = async (req, res, next) => {
    try {
        const cnt = await adminService.createQuoteWithJson(req);
        return successResponse(res, {}, `${cnt}개의 명언 데이터가 생성되었습니다.`);
    } catch (err) {
        next(err)
    }
};

module.exports = {
    createQuote,
    createQuoteWithJson
};