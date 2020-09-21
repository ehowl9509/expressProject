const express = require('express');
const passport = require('passport'); //passport 추가
const router = express.Router();
var NaverStrategy = require('passport-naver').Strategy;


/* naver 로그인 연동
 *
 */
router.get('/naver',passport.authenticate('naver',null),function(req, res) {
    console.log("/main/naver");
});

//처리 후 callback 처리 부분 성공/실패 시 리다이렉트 설정
router.get('/naver/callback', passport.authenticate('naver', {
        successRedirect: '/',
        failureRedirect: '/login/naver'
    })
);

passport.use(new NaverStrategy({
        clientID: 'q38FNiPzdFN0OdjnSZvt',
        clientSecret: 'bTEBWlZkz4',
        callbackURL: 'http://localhost:3000/admin/products'
    },
    function (accessToken, refreshToken, profile, done) {
        var _profile = profile._json;

        loginByThirdparty({
            'auth_type': 'naver',
            'auth_id': _profile.id,
            'auth_name': _profile.nickname,
            'auth_email': _profile.email
        }, done);
    }
));


//failed to serialize user into session 에러 발생 시 아래의 내용을 추가 한다.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(req, user, done) {

    // passport로 로그인 처리 후 해당 정보를 session에 담는다.
    req.session.sid = user.name;
    console.log("Session Check :" +req.session.sid);
    done(null, user);
});
function loginByThirdparty(info, done) {
    console.log(info.auth_type);
}

module.exports = router;


