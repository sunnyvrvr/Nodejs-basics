const sqlite3 = require('sqlite3');
const { promisify } = require('util');

const db = new sqlite3.Database('mydb2.db');
const runAsync = promisify(db.run.bind(db));
const eachAsync = promisify(db.each.bind(db));

// 테이블 생성 - 사용자 테이블
runAsync(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT
)`)
    .then(() => {
        // 데이터 삽입 (CREATE) => INSERT
        const newUser = { username: 'sunjinjung', email: 'sunjin@mail.com' };
        return runAsync('INSERT INTO users (username, email) VALUES (?, ?)', [newUser.username, newUser.email]);
    })
    .then(function () {
        console.log('데이터 삽입 성공', this.lastID);
    })
    .then(() => {
        // 데이터 조회 (READ) => SELECT
        return eachAsync('SELECT * FROM users', (err, row) => {
            if (err) {
                console.log('쿼리 실패');
                return;
            }
            console.log('All Users: ', row);
        });
    })
    .then(() => {
        // 데이터 수정 (UPDATE) => UPDATE
        const updateUser = {
            id: 1,
            username: 'sunjinj',
            email: 'sunjin@mail.com'
        };
        return runAsync('UPDATE users SET username=?, email=? WHERE id=?', [updateUser.username, updateUser.email, updateUser.id]);
    })
    .then(() => {
        console.log('수정 성공');
    })
    .then(() => {
        // 데이터 삭제 (DELETE) => DELETE
        const delUser = { id: 7 };
        return runAsync('DELETE FROM users WHERE id=?', [delUser.id]);
    })
    .then(() => {
        console.log('삭제 성공');
    })
    .catch((err) => {
        console.error('에러 발생:', err);
    })
    .finally(() => {
        // 데이터베이스 연결 종료
        db.close();
    });
