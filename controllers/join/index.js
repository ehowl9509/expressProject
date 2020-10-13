const passport = require('passport'); //passport 추가
const { Router } = require('express');
const router = Router();
const models = require('../../models');
const nodemailer = require('nodemailer');
const ctrl = require('./join.ctrl');

router.get('/view', ctrl.get_loginView);

router.post("/nodemailerTest", function(req, res, next){

    let email = req.body.email;
    let password = req.body.password;

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
            "<a href='http://localhost:3000/join/auth/?email="+ email +"&password="+ password +"'>인증하기</a>"
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

router.post("/auth", function(req, res, next){
    console.log(req.query.email);
    console.log(req.query.password)
})

module.exports = router;


