require('dotenv').config();

// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const quoteRoutes = require('./routes/quoteRoutes');

const sequelize = require('./config/db')
const quoteModel = require('./models/quote')

const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');


// 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/quote', quoteRoutes);

// 404 에러 핸들링 미들웨어
app.use(notFoundHandler);

// 에러 핸들링 미들웨어
app.use(errorHandler);

// 데이터베이스 동기화 및 서버 시작
sequelize.sync({ alter: true }).then(() => {
    console.info('Database & tables 생성');

    // 기본적인 라우트 설정
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database 연결 중 오류 발생:', err);
});