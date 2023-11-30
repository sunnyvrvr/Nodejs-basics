const sqlite = require('better-sqlite3');

const db = sqlite(':memory');

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TXT
)`)

//사용자 조회
const allUsers = db.prepare(`SELECT * FROM users`).all();
console.log('모든 사용자:', allUsers);

// 사용자 추가
const newUser = {
    username: 'sunjinjung', email: 'sunjin@gmail.com'
}

const insert = db.prepare('INSERT INTO users(username, email) VALUES (?,?)')
const insertResult = insert.run(newUser.username, newUser.email);
console.log('추가된 사용자는:', insertResult.lastInsertRowid);

//특정 사용자 조회
let userId, result;

userId = 1;
result = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
console.log(result ? `사용자 ${userId}: ${result.username}` : `사용자 ${userId}을 찾을 수 없습니다.`);

userId = 2;
result = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
console.log(result ? `사용자 ${userId}: ${result.username}` : `사용자 ${userId}을 찾을 수 없습니다.`);

userId = 3;
result = db.prepare(`SELECT * FROM users WHERE id = ?`).get(userId);
console.log(result ? `사용자 ${userId}: ${result.username}` : `사용자 ${userId}을 찾을 수 없습니다.`);

const updateUser = {
    username: 'shpark222', email: 'shpark222@sesac.com'
}
const update = db.prepare('UPDATE users SET username=?, email=? WHERE id=?');
update.run(updateUser.username, updateUser.email, updateUser.id);
console.log('업데이트 성공');

//사용자 삭제
const deleteUser = {
    id: 1
};
const deleteQuery = db.prepare('DELETE FROM users WHERE id=?');
deleteQuery.run(deleteUser.id);
console.log('삭제 성공');

db.close();