const quoteModel = require("../models/quote")
const sequelize = require('../config/db');

const { Op } = require('sequelize');

class AdminService {
    /**
     * 명언 목록
     * @param {number} page - 현재 페이지
     * @param {number} pageSize - 페이지 당 데이터 수
     * @param {String} query - 검색어
     * @param {String} searchType - 검색 타입
     * @returns {Object} { rows, count }
     */
    async quoteList(page, pageSize, query, searchType, sort) {
        const offset = (page - 1) * pageSize;

        // 검색어
        const where = {};
        if (query) {
            switch (searchType) {
                case 'author':
                    where.author = { [Op.like]: `%${query}%` };
                    break;
                case 'body':
                    where.body = { [Op.like]: `%${query}%` };
                    break;
            }
        }

        // 정렬
        const order = [];
        switch (sort) {
            case "latest": // 최신순
                order.push(['id', 'DESC']);
                break;
            case "abc": // 본문 ㄱㄴㄷ순
                order.push(['body', 'ASC']);
                break;
        }

        const { rows, count } = await quoteModel.findAndCountAll({
            attributes: [
                'id',
                'body',
                'author',
                [
                    sequelize.literal(`DATE_FORMAT(created_at, '%Y-%m-%d')`),
                    'createdAt',
                ],
            ],
            where,
            order: order,
            limit: pageSize,
            offset
        });

        return { rows, count };
    }

    /**
     * 명언 상세
     * @param {number} id - 명언 PK
     * @returns {Object} { quote }
     */
    async quoteDetail(id) {
        const quote = await quoteModel.findByPk(id, {
            attributes: [
                'id',
                'body',
                'author',
                'authorProfile',
                [
                    sequelize.literal(`DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s')`),
                    'createdAt'
                ],
                [
                    sequelize.literal(`DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s')`),
                    'updatedAt'
                ],
            ]
        });

        return quote
    }

    /**
     * 명언 생성
     * @param {*} data 
     * @returns quote 객체
     */
    async createQuote(data) {
        return await quoteModel.create(data);
    }

    /**
     * @async
     * @description JSON으로 명언 생성
     * @param {Object} data - 클라이언트로부터 전달된 데이터
     * @param {Object} data.file - JSON 파일 객체
     * @param {string} data.body.bodyField - 명언 본문 JSON 필드명
     * @param {string} data.body.authorField - 명언 작성자 JSON 필드명
     * @param {string} data.body.authorProfileField - 명언 작성자 프로필 JSON 필드명
     * @param {string} data.body.category - 명언 카테고리
     * @returns {Promise<number>} 생성된 명언 개수
     * @throws {Error} 정의 되지 않은 입력 필드가 있을 경우
     */
    async createQuoteWithJson(data) {
        // 파일 내용을 utf-8 형식의 문자열로 변환
        const jsonFile = data.file.buffer.toString('utf-8');
        const bodyField = data.body.bodyField;
        const authorField = data.body.authorField;
        const authorProfileField = data.body.authorProfileField;
        const category = data.body.category;

        // 정의되지 않은 필드 예외처리
        const fields = { jsonFile, bodyField, authorField, authorProfileField, category };
        const undefinedFields = Object.keys(fields).filter(key => typeof fields[key] === 'undefined');

        // 정의되지 않은 필드 존재 시 오류 발생
        if (undefinedFields.length) {
            const error = new Error(`${undefinedFields.join(', ')}을(를) 입력해주세요.`);
            error.status = 400;
            throw error;
        }

        let createCount = 0;

        // 파일 내용 JSON으로 파싱
        const jsonData = JSON.parse(jsonFile);

        // 파싱한 JSON으로 명언 데이터 생성
        jsonData.forEach(quote => {
            const quoteData = {
                body: quote[bodyField], // 명언 본문
                author: quote[authorField], // 명언 작성자
                authorProfile: quote[authorProfileField], // 작성자의 프로필
                category: category // 명언 카테고리
            };

            // 비정상적인 값이 있을 경우 건너뛰기
            if (Object.values(quoteData).includes(undefined)) {
                return;
            }

            // 데이터 저장
            quoteModel.create(quoteData);

            // 생성 수 증가
            createCount++;
        });

        // 생성된 명언 개수 반환
        return createCount;
    }

    /**
     * 명언 수정
     * @param {*} data 
     * @returns quote 객체
     */
    async updateQuote(data) {
        return await quoteModel.update(data, {
            fields: ['body', 'author', 'authorProfile', 'category'],
            where: { id: data.id }
        });
    }

    /**
     * 명언 삭제
     * @param {number} id  
     */
    async deleteQuote(id) {
        // 정의되지 않은 필드 존재 시 오류 발생
        if (id < 1 || isNaN(Number(id))) {
            const error = new Error(`유효하지 않은 명언 id입니다.`);
            error.status = 400;
            throw error;
        }

        const deleteCount = await quoteModel.destroy({
            where: {
                id: id,
            },
        });

        if (!deleteCount) {
            const error = new Error(`유효하지 않은 명언 id입니다.`);
            error.status = 400;
            throw error;
        }

        return;
    }

    /**
     * 쿠키에 저장된 쿼리스트링 값을 읽어와 리스트 페이지로 이동하는 링크를 생성
     */
    getToListLink(req) {
        const queryStringCookie = req.cookies.listQueryString;
        return "/admin" + (queryStringCookie ? queryStringCookie : '');
    }
}

module.exports = new AdminService();