const passport = require('passport'); //passport 추가
const { Router } = require('express');
const router = Router();
var NaverStrategy = require('passport-naver').Strategy;
const models = require('../../models');
const ctrl = require('./login.ctrl');

router.get('/view', ctrl.get_loginView);

// naver 로그인
router.get('/naver',
    passport.authenticate('naver')
);

//처리 후 callback 처리 부분 성공/실패 시 리다이렉트 설정
router.get('/naver/callback',
    passport.authenticate('naver', {
        successRedirect: '/',
        failureRedirect: '/login/naver'
    })
);

passport.use(new NaverStrategy({
        clientID: 'q38FNiPzdFN0OdjnSZvt',
        callbackURL: '/admin/products'
    },
    function (accessToken, refreshToken, profile, done) {
        console.log("@@@@@@@"+profile);
        models.Users.create({
            naver : profile.nickname,
            email : profile.email
        });
        var info = {
            'auth_type': 'naver',
            'auth_id': profile.id,
            'auth_name': profile.nickname,
            'auth_email': profile.email
        };
        loginByThirdparty(info, done);
    }
));

passport.serializeUser(function(info, done) {
    done(null, info);
});
passport.deserializeUser(function(info, done) {
    done(null, info);

});

function loginByThirdparty(info, done) {

    done(null, info);
}


module.exports = router;


