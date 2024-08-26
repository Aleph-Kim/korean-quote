const { successResponse, errorResponse } = require('../helper/responseHelper');

exports.getRandom = async (req, res) => {
    try {
        successResponse(res, {}, "Hello World!");
    } catch (err) {
        errorResponse(res, err.message);
    }
};