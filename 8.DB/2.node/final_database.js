const sqlite3 = require('sqlite3');

//내가 원하는 쿼리문 작성
//테이블 생성 - 사용자 테이블
function createTable() {
    return new Promise((resolve, reject) => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT
        )`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }       
        );
    })
}

//데이터 삽입 (CREATE) => INSERT
function insertUser(newUser) {
    return new Promise ((resolve, reject) => {

        db.run('INSERT INTO users (username, email) VALUES (?,?)',
            [newUser.username, newUser.email], function(err) {
                if (err) {
                    console.log('데이터 삽입 실패');
                    reject();
                } else {
                    console.log('데이터 삽입 성공', this.lastID);
                    resolve();
                }
            }
        )
    })
}
//데이터 조회 (READ) => SELECT
function readUser() {
    return new Promise((resolve, reject) => {
        db.each('SELECT * FROM users', (err, row) => {
            if (err) {
                console.log('쿼리실패');
                reject();
            } else {
                console.log('All Users: ', row);
                resolve();                
            }
        })
    })
}

//데이터 수정 (UPDATE) => UPDATE
function updateUser() {
    return new Promise((resolve, reject) => { 

        db.run('UPDATE users SET username=?, email=? WHERE id=?',
            [updateUser.username, updateUser.email, updateUser.id],
            function(err) {
                if (err) {
                    console.log('수정 실패');
                    reject(); 
                } else {
                    console.log('수정 성공');
                    resolve(); 
                }
            }
        )
    })
}

//데이터 삭제 (DELETE) => DELETE
function deleteUser(delUser) {
    return new Promise((resolve, reject) => {    
 
        db.run('DELETE FROM users WHERE id=?', [delUser.id],
        (err) => {
            if (err) {
                console.error('삭제 실패');
                reject();
            } else {
                console.log('삭제 성공');
                resolve();
            }
        })    
    })   
}

const db = new sqlite3.Database('mydb4.db');
module.exports =  {
    createTable,
    insertUser,
    updateUser,
    readUser,
    deleteUser,
    close: () => db.close();
};