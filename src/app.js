require('dotenv').config();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const cors = require('cors');
const path = require('path');

const errorRoutes = require('./routes/errorRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

const sequelize = require('./config/db')
const beforeValidateHandler = require('./middlewares/beforeValidateHandler');

const quoteModel = require('./models/quote')
const todayQuoteModel = require('./models/todayQuote')

const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

const checkAuth = require('./middlewares/checkAuth');

const cookieParser = require('cookie-parser');

app.use(cors());

// 미들웨어 설정
app.use(bodyParser.json());

// HTML 폼 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// 뷰 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 쿠키 파서
app.use(cookieParser());

// 세션 사용 설정
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60, // 세션 유효시간 (1시간)
        },
    })
);

// 라우트 설정
app.use('/api-docs', express.static('doc'));
app.use('/error', errorRoutes);
app.use('/quote', quoteRoutes);
app.use('/admin', checkAuth, adminRoutes);
app.use('/auth', authRoutes);

// 404 에러 핸들링 미들웨어
app.use(notFoundHandler);

// 에러 핸들링 미들웨어
app.use(errorHandler);

beforeValidateHandler(sequelize);

// 데이터베이스 동기화
// sequelize.sync({ force: true }).then(() => {
//     console.info('Database & tables 생성');
// });

// 기본적인 라우트 설정
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});