const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

//세션 설정
app.use(session({
    secret: 'my-secret-key', //세션 데이터를 암호화 하기 위한 키
    resave: false,
    saveUninitialized: true
}));

//미들 웨어를 사용해서, 이 사람의 방문횟수 트래킹
app.use((req, res, next) => {
    req.session.visitCount = req.session.visitCount || 0;
    req.session.visitCount ++;

    console.log('SessionID', req.sessionID);
    console.log('SessionInfo', req.session.visitCount);
    next();
})

app.get('/', (req, res) => {
    res.send(`당신의 방문횟수는 ${req.session.visitCount} 입니다`);
})

app.listen(port, () => {
    console.log(`서버 ${port} 레디`)
})