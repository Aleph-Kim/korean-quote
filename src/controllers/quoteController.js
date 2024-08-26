const { successResponse, errorResponse } = require('../helpers/responseHelper');
const quoteService = require("../services/quoteService");

/**
 * 명언 생성
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 */
const createQuote = async (req, res) => {
    try {
        const quote = await quoteService.createQuote(req.body);
        successResponse(res, quote, "명언 데이터가 생성되었습니다.");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

/**
 * 명언 랜덤 조회
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 */
const randomQuote = async (req, res) => {
    try {
        const quote = await quoteService.randomQuote();
        successResponse(res, quote);
    } catch (err) {
        errorResponse(res, err.message);
    }
}

module.exports = { createQuote, randomQuote };