const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        secret: 'this-is-my-importantsecrtet',
        resave: false,
        saveUninitilaized: true,
    })
)

//퍼블릭 폴더를 정적 파일 폴더로 사용
app.use("/login", express.static("public")) //public 설정

//배열(1차원 배열=1-D Array 두개의 객체(Object)를 담고 있음
const users = [
    {id: 1, username: 'user1', password: 'pwd1'},
    {id: 2, username: 'user2', password: 'pwd2' },
];
    
// 로그인 라우트
app.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    console.log(username, password);
    
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.json({ message: '로그인 성공!' });
    } else {
        res.status(401).json({ message: '로그인 실패' });
    }
});

app.get('/profile', (req, res) => {
    const user= req.session.user;

    if(user) {
        res.json({username: user.username, message: '프로필 정보'});
    } else {
        res.status(401).json({message: '로그인이 필요합니다.'});
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.status(500).json({ message: '로그아웃 실패'})
        } else {
            res.json({ message: '로그아웃 성공'})
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index2.html'));
})

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});