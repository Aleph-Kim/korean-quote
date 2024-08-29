const { Sequelize } = require("sequelize");
const quoteModel = require("../models/quote")
const todayQuoteModel = require("../models/todayQuote")

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

    /**
     * 오늘의 명언 조회
     * @returns quoteModel
     */
    async todayQuote() {
        // 마지막으로 생성된 todayQuote 데이터
        const lastQuote = await todayQuoteModel.findOne({
            order: [['createdAt', 'DESC']]
        });

        // lastQuote가 오늘 생성된 데이터인지 확인
        const isToday = lastQuote && lastQuote.createdAt.toDateString() === new Date().toDateString();

        let todayQuote;
        if (isToday) {
            // lastQuote가 오늘 생성된 데이터면 해당 데이터 반환
            todayQuote = await quoteModel.findOne({
                where: {
                    id: lastQuote.quoteId
                }
            });
        } else {
            // todayQuote가 없다면 아무 quote, 있다면 마지막 todayQuote와 다른 quote
            const todayWhere = todayQuote == null ? {} : { quote_id: { [Sequelize.ne]: lastQuote.quoteId } }

            todayQuote = await quoteModel.findOne({
                where: todayWhere,
                order: Sequelize.literal('RANDOM()')
            });

            todayQuoteModel.create({
                quoteId: todayQuote.id
            });
        }

        return {
            body: todayQuote.body,
            author: todayQuote.author,
            author_profile: todayQuote.authorProfile,
        }
    }
}

module.exports = new QuoteService();