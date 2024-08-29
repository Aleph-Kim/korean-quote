const { Sequelize } = require("sequelize");
const quoteModel = require("../models/quote")

class QuoteService {
    /**
     * 명언 생성
     * @param {*} data 
     * @returns quote 객체
     */
    async createQuote(data) {
        const quote = await quoteModel.create(data);
        return quote;
    }

    /**
     * 명언 랜덤 조회
     * @returns quote 객체
     */
    async randomQuote() {
        const quote = await quoteModel.findOne({
            order: Sequelize.literal('RANDOM()')
        });
        return {
            body: quote.body,
            author: quote.author,
            author_profile: quote.authorProfile,
        }
    }
}

module.exports = new QuoteService();