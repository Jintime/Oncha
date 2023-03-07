"use strict";
const app = require('../app');
const logger = require('../src/config/logger');
const datenv = require("dotenv");
datenv.config('../.env');
//포트
const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
    logger.info(`${PORT} 포트에서 서버가 가동`);
});