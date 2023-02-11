"use strict";

//모듈
const express = require('express');
const bodyParser =require("body-parser");
const app = express();


//라우팅
const home = require('./src/routes/home');


app.set('views','./src/views');
app.set('view engine','ejs');
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());

///url 통해 전달되는 데이터가 한글 공백 같은 문자가 포함될경우 인식되지않는 문제해결
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',home);


module.exports = app;