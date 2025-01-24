/**
 * 로그인 여부 체크
 */
function checkAuth(req, res, next) {
    if (req.session && req.session.isAdmin) { // 로그인 세션이 있을 경우 통과
      return next();
    } else { // 없으면 로그인 페이지로
      return res.redirect('/auth/login');
    }
  }
  
  module.exports = checkAuth;
  