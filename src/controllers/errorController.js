class ErrorController {
    /**
     * 400 Error
     */
    async serverError(req, res, next) {
        const { errors, from } = req.query;
        res.render("layout/main", {
            title: "잘못된 요청",
            body: "errors/400",
            errors,
            from
        });
    }
}

module.exports = new ErrorController();