const { successResponse, errorResponse } = require('../helpers/responseHelper');
const adminService = require('../services/adminService');

class AdminController {
    async quoteList(req, res, next) {
        // 페이지 번호
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

        // 한 페이지당 표시할 데이터 개수
        const pageSize = 10;

        // 표시할 페이지 개수
        const showPageCount = 10;

        const { rows: quotes, count } = await adminService.quoteList(page, pageSize);

        // 전체 페이지 수
        const totalPages = Math.ceil(count / pageSize);

        if (totalPages < page) {
            res.redirect(`/admin/list?page=${totalPages}`)
        }

        // 페이지네이션 시작 숫자
        const startPage = Math.max(1, page - (showPageCount / 2));
        // 페이지네이션 끝 숫자
        const endPage = Math.min(totalPages, page + (showPageCount / 2));

        res.render("layout/main", {
            title: "명언 목록",
            body: "quote/list",
            quotes,
            currentPage: page,
            totalPages,
            startPage,
            endPage
        });
    }


    /**
     * 명언 생성
     * @param {*} req 요청 객체
     * @param {*} res 응답 객체
     */
    async createQuote(req, res, next) {
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
    async createQuoteWithJson(req, res, next) {
        try {
            const cnt = await adminService.createQuoteWithJson(req);
            return successResponse(res, {}, `${cnt}개의 명언 데이터가 생성되었습니다.`);
        } catch (err) {
            next(err)
        }
    };
}
module.exports = new AdminController();