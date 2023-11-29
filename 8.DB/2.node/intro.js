const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb1.db');

//테이블 생성
db.run(`CREATE TABLE greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT)`);

//데이터 삽입
const msg1 = ['Hello, World'];
db.run(`INSERT INTO greeting (message) VALUES (?)`, msg1,
    function (err) {
        if (err) {
            console.log('데이터 삽입 실패');
            return;
        }
        console.log('데이터 성공적으로 추가:', this.lastID);
    }
);

//데이터 조회
db.each('SELECT * FROM greetings', (err, row) => {
    if (err) {
        console.log('쿼리실패');
        return;
    }
    console.log('Greeting: ', row.message);
});

//데이터베이스 연결 종류
db.close();