const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3000;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND= 404;

//nunjucks 초기화
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

nunjucks.configure('views', { express: app });
// 미들웨어 설정
app.set('view engine', 'html');



app.get("/", (req, res) => {
    const pageTitle = "사용자 테이블";

    const data = [];

    fs.createReadStream("user.csv", { encoding: "utf8" })
        .pipe(csv())
        .on('data', (row) => {
            // CSV 파일 행마다 실행되는 로직
            data.push(row);
        })
        .on('end', () => {
            // 파일 읽기 완료 후 렌더링
            res.render("index", { data: data });
        })
        .on('error', (error) => {
            // 에러 처리
            console.error('Error reading CSV file:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.listen(port, () => {
  console.log(`서버 ${port} 준비`);
});

