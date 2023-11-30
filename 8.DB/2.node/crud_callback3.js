const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb2.db');

//내가 원하는 쿼리문 작성
//테이블 생성 - 사용자 테이블
db.run(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`, (err) => {
        if (err) {
            console.error('생성오류'); 
            return;
        } 
        console.log('생성 성공');

    //데이터 삽입 (CREATE) => INSERT
    const newUser = { username: 'sunjinjung', email: 'sunjin@mail.com' }

    db.run('INSERT INTO users (username, email) VALUES (?,?)',
        [newUser.username, newUser.email], function (err) {
            if (err) {
                console.log('데이터 삽입 실패');
                return;
            } 
            console.log('데이터 삽입 성공', this.lastID);
            .then(()=> {
            

                    
            })
        }
    })
}
)
//데이터베이스 연결 종류
db.close();