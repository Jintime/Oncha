"use strict";

//모듈c최고
const express = require('express');
const bodyParser =require("body-parser");
const datenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require('passport');


datenv.config();

const app = express();
// express-session 설정
app.use(session({
    secret: process.env.SECRET, // 세션 ID를 암호화하기 위한 문자열
    resave: false,
    saveUninitialized: false
}));
// passport 초기화 및 세션 관리 설정
app.use(passport.initialize());
app.use(passport.session());
// passport.serializeUser() 함수를 사용하여 세션에 저장할 데이터를 설정합니다.
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  // passport.deserializeUser() 함수를 사용하여 세션에서 데이터를 읽어옵니다.
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
  
//라우팅
const home = require('./src/routes/home');

app.set('views','./src/views');
app.set('view engine','ejs');
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(cookieParser());

///url 통해 전달되는 데이터가 한글 공백 같은 문자가 포함될경우 인식되지않는 문제해결
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',home);


module.exports = app;