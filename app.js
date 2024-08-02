// server.js
const express = require('express');
const bodyParser = require('body-parser');
const quoteRoutes = require('./app/routes/quoteRoutes');
const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(bodyParser.json());

// 라우트 설정
app.use('/', quoteRoutes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});