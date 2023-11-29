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
        }
    )
    //데이터 조회 (READ) => SELECT
    db.each('SELECT * FROM users', (err, row) => {
        if (err) {
            console.log('쿼리실패');
            return;
        }
        console.log('All Users: ', row);
    });

    //데이터 삭제 (DELETE) => DELETE
    // const delUser = {
    //     id: 3
    // }

    // db.run('DELETE FROM users WHERE id=?', [delUser.id], (err) => {
    //     if (err) {
    //         console.error('삭제 실패');
    //         return;
    //     }
    //     console.log('삭제 성공');
    // })

    //데이터 수정 (UPDATE) => UPDATE
    const updateUser = {
        id: 1,
        username: 'sunjinj',
        email: 'sunjin@mail.com'
    }

    db.run('UPDATE users SET username=? email=? WHERE id=?',
        [updateUser.username, updateUser.email, updateUser.id],
        (err) => {
            if (err) {
                console.log('수정 실패', err);
                return;
            }
            console.log('수정 성공');
        });
}
)
//데이터베이스 연결 종류
db.close();