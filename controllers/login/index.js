const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const { Router } = require('express');
const router = Router();
const ctrl = require('./login.ctrl');
const models = require('../../models');
router.use(passport.initialize());
router.use(passport.session());

router.get('/view', ctrl.get_loginView);

//Session 관리
passport.serializeUser(function(user, done) {
    console.log("@@@@@@"+user.id);
    done(null, user.id);

});
passport.deserializeUser(function(id, done) {
    console.log(id);
    done(null, id);
});

//LocalStrategy
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function(email, password, done) {
    const userInfo = await models.User.findOne({
        where : {email: email}
    });
        const user = {
            id : userInfo.email,
            pw : userInfo.password
        };
        if(email===user.id && password===userInfo.pw){
            console.log("seccess");
            done(null, user);
        }else{
            console.log("fail");
        }

    }
));

//로그인 성공과 실패 시 Routing
router.post('/login', passport.authenticate('local', {
        successRedirect: '/test',
        failureRedirect: '/login'
    })
);

module.exports = router;


