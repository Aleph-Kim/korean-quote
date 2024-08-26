const { successResponse, errorResponse } = require('../helpers/responseHelper');
const quoteService = require("../services/quoteService");

const createQuote = async (req, res) => {
    try {
        const quote = await quoteService.createQuote(req.body);
        successResponse(res, quote, "명언 데이터가 생성되었습니다.");
    } catch (err) {
        errorResponse(res, err.message);
    }
};

const randomQuote = async (req, res) => {
    try {
        const quote = await quoteService.randomQuote();
        successResponse(res, quote);
    } catch (err) {
        errorResponse(res, err.message);
    }
}

module.exports = { createQuote, randomQuote };