const { errorResponse } = require('../helper/responseHelper');

const errorHandler = (err, req, res, next) => {
    console.error(err); // 에러 로깅

    return errorResponse(res, err.message || 'Internal Server Error', err.status || 500);
};

module.exports = errorHandler;
