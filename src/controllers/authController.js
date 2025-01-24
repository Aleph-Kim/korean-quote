class AuthController {
    /**
     * 로그인 페이지
     * @param {String} error 에러 메시지
     * @returns 
     */
    login = (req, res, next, error = null) => {
        // 이미 로그인 했으면 리스트 페이지로 이동
        if (req.session.isAdmin) {
            return res.redirect('/admin');
        }

        res.render("layout/main", {
            title: "관리자 로그인",
            body: "auth/login",
            error
        });
    }

    /**
     * 로그인 프로세스
     */
    loginProc = (req, res, next) => {
        const { password } = req.body;

        if (password === process.env.ADMIN_PASSWORD) {
            req.session.isAdmin = true;
            res.redirect('/admin');
        } else {
            this.login(req, res, next, "비밀번호가 일치하지 않습니다.");
        }
    }

    /**
     * 로그아웃
     */
    logout = (req, res, next) => {
        req.session.destroy((err) => {
            if (err) console.error(err);
            res.clearCookie('connect.sid');
            res.redirect('/auth/login');
        });
    }
}
module.exports = new AuthController();