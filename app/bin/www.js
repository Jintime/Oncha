"use strict";
const app = require('../app');

//포트
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log('on');
});