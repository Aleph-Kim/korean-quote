const { errorResponse } = require('../helper/responseHelper');

const notFoundHandler = (req, res, next) => {
    return errorResponse(res, 'Resource not found', 404);
};

module.exports = notFoundHandler;
