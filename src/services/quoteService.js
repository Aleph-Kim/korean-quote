const { Sequelize } = require("sequelize");
const quoteModel = require("../models/quote")

class QuoteService {
    async createQuote(data){
        switch(true){
            case !data.body:
                throw new Error("명언 내용을 입력해주세요.");
            case !data.author:
                throw new Error("작성자를 입력해주세요.");
        }

        const quote = await quoteModel.create(data);
        return quote;
    }

    async randomQuote(){
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