const sqlite = require('better-sqlite3');

const db= sqlite('mydb1.db');
//문법이 다름

//테이블 생성
db.exec(`CREATE TABLE greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT)`);

//데이터 삽입
const msg1 = ['Hello, World33'];
const insert = db.prepare(`INSERT INTO greeting (message) VALUES (?)`);
const result = insert.run(msg1);
console.log('데이터 성공적으로 추가:', result.lastID);

//데이터 조회
const read = ('SELECT * FROM greetings');
const greetings = read.all();
//console.log(greetings);
greetings.forEach((row) => {
    console.log('Greeting:', row.message);
})

//데이터베이스 연결 종류
db.close();