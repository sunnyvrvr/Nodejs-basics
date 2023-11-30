const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(':memory');

db.serialize(() => {
    db.run('CREATE TABLE users(id INT, name TEXT)');
    db.run('INSERT INTO users VALUES (?,?)', [1, 'user1']);
    db.run('INSERT INTO users VALUES (?,?)', [2, 'user2']);
    db.all('SELECT * FROM users',  (err, rows) => {
        console.log('결과 출력:', rows);
    });
});

db.close();