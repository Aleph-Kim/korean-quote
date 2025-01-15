const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

/**
 * @api {get} /quote/random 랜덤 명언 조회
 * @apiGroup Quote
 *
 * @apiSuccess {Boolean} success 요청 성공 여부 
 * @apiSuccess {String} message 응답 메시지
 * @apiSuccess {Object} data 명언 데이터
 * @apiSuccess {String} data.body 명언 내용
 * @apiSuccess {String} data.author 명언 작성자
 * @apiSuccess {String} data.author_profile 작성자의 프로필 또는 설명
 *
 * @apiSuccessExample {json} 성공 응답 예시:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Success",
 *       "data": {
 *         "body": "소프트웨어를 디자인할 때는 나는 건축가 이다. 유저 인터페이스를 디자인할 때는 예술가이며, 구현할 때는 장인이 된다. 하지만 테스트를 할 때는 아마 쳐죽일 놈이 될 것이다.",
 *         "author": "Steve McConnell",
 *         "author_profile": "Construx Software Builders사의 CEO"
 *       }
 *     }
 */
router.get('/random', quoteController.randomQuote);

/**
 * @api {get} /quote/today 오늘의 명언 조회
 * @apiGroup Quote
 *
 * @apiSuccess {Boolean} success 요청 성공 여부 
 * @apiSuccess {String} message 응답 메시지
 * @apiSuccess {Object} data 명언 데이터
 * @apiSuccess {String} data.body 명언 내용
 * @apiSuccess {String} data.author 명언 작성자
 * @apiSuccess {String} data.author_profile 작성자의 프로필 또는 설명
 *
 * @apiSuccessExample {json} 성공 응답 예시:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Success",
 *       "data": {
 *         "body": "에러 없는 프로그램을 만드는 데는 두가지 방법이 있다. 그런데  세번째 것만 작동한다.",
 *         "author": "Alan J. Perlis",
 *         "author_profile": "알골 프로그램 창시자"
 *       }
 *     }
 */
router.get('/today', quoteController.todayQuote);

module.exports = router;
