// # 이전에 받은 쿠키를 사용하여 서버에 요청하기
// curl --cookie cookie.txt http://localhost:3000/readcookie

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
    // 클라이언트에게 쿠키 설정 - 1분 (60000ms = 60초) 동안 유효한 쿠키
    res.cookie('mycookie', 'test', { maxAge: 60000 });

    // 응답 전송
    res.send('Cookie has been set for 1 minute!');
});

app.get('/readcookie', (req, res) => {
    // 클라이언트로부터 쿠키 읽기 - 미들웨어를 통해 cookies에 셋업
    const myCookie = req.cookies.mycookie;

    // 응답 전송
    res.send(`Value of mycookie: ${myCookie}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});