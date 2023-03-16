"use strict";

const { Router } = require('express');
const express = require('express');
const router = express.Router();
const jwt_va =require("../../utils/jwt/jwt_va");
const multer = require('multer');
const path =require("path");
const ctrl =require('./home.ctrl');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jsonwebtoken');

/*const { SolapiMessageService } = require('solapi');

const messageService = new SolapiMessageService(
   process.env.API_KEY,
   process.env.API_SCRET
  );

messageService
  .sendOne({
    text: '00월 00일 00시 예약이 확인되었습니다! ',
    type: 'SMS', // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
    to: '01033517391', // 수신번호 (받는이)
    from: '01033517391' // 발신번호 (보내는이)
  })
  .then(res => console.log(res));
*/
// 단일 예약발송 예제, send 메소드로도 동일하게 사용가능
// 예약발송 시 현재 시간보다 과거의 시간을 입력할 경우 즉시 발송됩니다.


const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'src/public/img');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext)+ ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

//jwt 미들웨어
function issueJWT(payload) {
  const expiresIn = '1d';
  const token = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn });
  return {
      token,
      expiresIn
  };
}


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  // 로그인 성공 시 처리할 로직
  // profile에는 구글 계정의 정보가 담겨 있습니다.
  return done(null, profile);
}
));



//구글로그인
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 로그인 후 콜백 처리
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // JWT 토큰 발급 후 클라이언트로 응답합니다.
  const { user } = req;
  const { token, expiresIn } = issueJWT(user);
  res.redirect('/').json({ token, expiresIn });

});




router.get('/',ctrl.output.home);
router.get('/login',ctrl.output.login);
router.get('/register',ctrl.output.register);
router.get('/mypage',jwt_va,ctrl.routeprocess.mypage);
router.get('/write',jwt_va,ctrl.output.write);

router.get('/order',jwt_va,ctrl.output.order);
router.get('/reservation',jwt_va,ctrl.output.reservation);
router.get('/coupon',jwt_va,ctrl.output.coupon);
router.get('/intro',jwt_va,ctrl.output.intro);
router.get('/notification',jwt_va,ctrl.output.notification);
router.get('/faq',jwt_va,ctrl.output.faq);
router.get('/csc',jwt_va,ctrl.output.csc);
router.get('/inquiry',jwt_va,ctrl.output.inquiry);
router.get('/admin_page',jwt_va,ctrl.routeprocess.mypage);
router.get(`/order_test`,jwt_va,ctrl.output.test);

router.post('/login',ctrl.routeprocess.login);
router.post('/register',ctrl.routeprocess.register);
router.post('/write',jwt_va,upload.single("image"),ctrl.routeprocess.write);
router.get('/logout',jwt_va,ctrl.routeprocess.logout);
router.get('/comboard',jwt_va,ctrl.routeprocess.comboard);
router.get('/admin',jwt_va,ctrl.routeprocess.adminsite);
router.get('/onboard',jwt_va,ctrl.routeprocess.onboard);




module.exports =router;