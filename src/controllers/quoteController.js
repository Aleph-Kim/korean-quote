const { successResponse, errorResponse } = require('../helpers/responseHelper');
const quoteService = require("../services/quoteService");

/**
 * 명언 생성
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 */
const createQuote = async (req, res, next) => {
    try {
        const quote = await quoteService.createQuote(req.body);
        return successResponse(res, quote, "명언 데이터가 생성되었습니다.");
    } catch (err) {
        next(err)
    }
};

/**
 * 명언 랜덤 조회
 * @param {*} req 요청 객체
 * @param {*} res 응답 객체
 */
const randomQuote = async (req, res, next) => {
    try {
        const quote = await quoteService.randomQuote();
        return successResponse(res, quote);
    } catch (err) {
        next(err)
    }
}

const todayQuote = async (req, res, next) => {
    try {
        const quote = await quoteService.todayQuote();
        return successResponse(res, quote);
    } catch (err) {
        next(err)
    }
}

module.exports = { 
    createQuote, 
    randomQuote,
    todayQuote
};