const passport = require('passport'); //passport 추가
const { Router } = require('express');
const router = Router();
const models = require('../../models');
const nodemailer = require('nodemailer');
const ctrl = require('./join.ctrl');

router.get('/view', ctrl.get_loginView);

router.post("/nodemailerTest", (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;
    let phoneNum = req.body.phoneNum;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dksdlsrb10@gmail.com',  // gmail 계정 아이디를 입력
            pass: '!dusqhd1djr'          // gmail 계정의 비밀번호를 입력
        }
    });

    let mailOptions = {
        from: 'dksdlsrb10@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
        to: email ,                     // 수신 메일 주소
        subject: '[Node.js]인증 메일이 도착했습니다.',   // 제목
        html: '<p>아래의 링크를 클릭해주세요 !</p>' +
            "<a href='http://localhost:3000/join/auth?email="+ email +"&password="+ password +"&phoneNum="+ phoneNum +"'>인증하기</a>"
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.redirect("/join/View");

})

router.get("/auth", (req, res, next) => {

    let email = req.query.email;

    let password = req.query.password;

    if(!email  && !password){
        res.render('login/loginView.html');
        return false;
    }

    models.User.create({
        email: email,
        password: password
    }).then( (result ) => {
        res.render('login/loginView.html', {result:"success", email:email})
        console.log("success");
    }).catch((error) => {
        console.log("error" + error);
    })
});

module.exports = router;


