const { successResponse, errorResponse } = require('../helpers/responseHelper');

exports.getRandom = async (req, res) => {
    try {
        successResponse(res, {}, "Hello World!");
    } catch (err) {
        errorResponse(res, err.message);
    }
};