const { successResponse, errorResponse } = require('../helpers/responseHelper');
const adminService = require('../services/adminService');
const parameterValidator = require('../middlewares/parameterValidator');

class AdminController {
    /**
     * 명언 목록
     */
    async quoteList(req, res, next) {
        // 검색어
        const query = req.query.query || '';
        // 검색 타입
        const searchType = req.query.searchType || '';

        // 페이지 번호
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

        // 한 페이지당 표시할 데이터 개수
        const pageSize = 10;

        // 표시할 페이지 개수
        const showPageCount = 10;

        const { rows: quotes, count } = await adminService.quoteList(page, pageSize, query, searchType);

        // 전체 페이지 수
        const totalPages = Math.ceil(count / pageSize);

        if (totalPages && totalPages < page) {
            res.redirect(`/admin?page=${totalPages}&searchType=${searchType}&query=${query}`);
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
            endPage,
            searchType,
            query
        });
    }

    /**
     * 명언 상세
     */
    async quoteDetail(req, res, next) {
        const { id } = req.params;

        const quote = await adminService.quoteDetail(id);

        if (quote == null) { // 데이터가 없을 때
            req.customErrors = [{ msg: ' 찾을 수 없는 명언입니다.' }];
            return parameterValidator.handleValidationResult(req, res, next);
        }

        // 리스트 페이지 이동 링크
        const toListLink = adminService.getToListLink(req);

        res.render("layout/main", {
            title: "명언 상세페이지",
            body: "quote/detail",
            quote,
            toListLink
        });
    }

    /**
     * 명언 상세
     */
    async createView(req, res, next) {
        res.render("layout/main", {
            title: "명언 생성페이지",
            body: "quote/detail",
            quote: {},
        });
    }

    /**
     * 명언 생성
     */
    async createQuote(req, res, next) {
        try {
            if (req.body.id) {
                const quote = await adminService.updateQuote(req.body);
                return successResponse(res, quote, "명언 데이터가 수정되었습니다.");
            } else {
                const quote = await adminService.createQuote(req.body);
                return successResponse(res, quote, "명언 데이터가 생성되었습니다.");
            }
        } catch (err) {
            next(err)
        }
    };

    /**
     * JSON 파일로 명언 생성
     */
    async createQuoteWithJson(req, res, next) {
        try {
            const cnt = await adminService.createQuoteWithJson(req);
            return successResponse(res, {}, `${cnt}개의 명언 데이터가 생성되었습니다.`);
        } catch (err) {
            next(err)
        }
    };

    /**
     * 명언 삭제
     */
    async deleteQuote(req, res, next) {
        try {
            await adminService.deleteQuote(req.body.id);
            return successResponse(res, null, "명언 데이터가 삭제되었습니다.");
        } catch (err) {
            next(err)
        }
    }
}
module.exports = new AdminController();