const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb1.db';

const db = new sqlite3.Database(dbFile);

app.use(express.json()); //body안에 있는 json 형식을 찾아서 파싱해서 req.body 안에 넣기
app.use(express.urlencoded({ extended: true }));

//DB 초기화 함수
function init_database() {
    return new Promise((resolve, reject) => {
        // DB 초기화 코드 작성
        // CREATE TABLE 
        const sql = fs.readFileSync('init_database.sql', 'utf8');
        //console.log(sql);       
        db.exec(sql, (err) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT'){
                    console.warn('DB가 이미 초기화 되어 있음');
                    resolve();
                } else {
                    console.error('초기화 실패', err); //초기화 되어있으면 초기화 찍지 않기
                    reject(); 
                }
            } else {
                console.error('초기화 성공'); 
                resolve();
            }
        })
    })
}

// 루트 경로에 대한 예시 핸들러 - 모든 사용자 조회
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(rows);
    });
});

// 특정 사용자 조회
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(row);
    });
});

// 새로운 사용자 생성
app.post('/users', (req, res) => {
    //const { username, password } = req.body;
    const username = req.body.username;
    const password= req.body.password;   

    console.log(username, password);

    const query = 'INSERT INTO (username, password) VALUES (?,?)'
    
    db.run(query, [username, password], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('내부 오류로 인해 사용자를 생성할 수 없습니다.');
            return;
        }
        res.send('생성 완료!');
    })
     
    res.send('생성 완료!');

})
// 사용자 정보 업데이트
app.put('/users/:id', (req, res) => {
    //입력받은 사용자의 정보롤 DB에 갱신하시오
    const userId = req.params.id;
    const { username, password } = res.body;
    console.log(username, password);
    
    const query = 'UPDATE users SET username=? password=? WHERE id=?'

    db.run(query, [username, password, userId], (err) => {
        if (err) {
            res.status(500).send('내부오류');
            return;
        }
        res.send('사용자 정보 갱신 완료');
    })
})       
// 사용자 삭제 
app.delete('/users', (req, res) => {
    const userId = req.params.id;

    db.run('DELETE FROM users WHERE id = ?', [userId], (err) => { 
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
            return;
        } 
        res.send('사용자 삭제 완료');
    })
})

//서버 URL
app.get('/users', (req, res) => { 
    //DB로부터 특정 테이블을 조회하는 코드 작성
    //const username = req.query.username;
    const { username } = req.query;
    
    //GET 방식으로 username 받아와서, 이 사용자 검색하기
    //127.0.0.1:3000/users?username=user1
    //127.0.0.1:3000/users?username=user1
    //127.0.0.1:3000/users?username=user1
    console.log(username);
    let query;
    
    if (username) {
        query = `SELECT * FROM users WHERE username LIKE '%${username}%'`;
    } else {
        query = 'SELECT * FROM users';
    }

    console.log(query);

    db.all(query, (err, rows) => {
        res.json
    })
});

//서버 URL
app.get('/products', (req, res) => {
    //DB로부터 특정 테이블을 조회하는 코드 작성
    const { name, price } = req.query;
    //const name =req.query.name;
    //const price =req.query.price;  
    let query;
    let condition = 0;
    
    console.log(`name: ${name}, price: ${price}`);

    function buildQuery() {
        let query = 'SELECT * FROM products'
        const conditions = [];

        if (name) {
            condition.push(`name LIKE '%${name}'`);               
        } 
        if (price) {
            condition.push(`name LIKE '%${price}'`);              
        }
        if (conditions.length > 0) {
            query += `WHERE ${conditions.join(' AND ')}`;
        }
        return query;
    }
})

app.get('/books', (req, res) => {
    //DB로부터 특정 테이블을 조회하는 코드 작성
    const { title, author, genre } = req.query;
    //const name =req.query.name;
    //const price =req.query.price;  
    let query = '';
    
    console.log(`title: ${title}, author: ${author}, genre: ${genre}`);

    //query = query + 'SELECT * FROM products ';
    query += 'SELECT * FROM books'

    if (title) {
        query += `WHERE title LIKE '%${title}%'`;               
    } 
    if (author) {
        query += `WHERE author LIKE '%${author}%'`;               
    }
    if (genre) {
        query += `WHERE author LIKE '%${genre}%'`;               
    }

    console.log(`쿼리: ${query}`) 

    //GET 방식으로 price 받아와서, 이 name 검색하기
    //127.0.0.1:3000/products?price=2000
    //127.0.0.1:3000/products?price=2000
    //127.0.0.1:3000/products?price=2000
    //127.0.0.1:3000/products?price=2000
    //127.0.0.1:3000/products?price=2000
    db.all(query, (err, rows) => {
        res.send(rows);
    })
})

//Express 서버 시작
async function startServer() {
    try {
        await init_database();

        app.listen(port, () => {
            console.log(`서버 레디 ${port}`)
    });
    } catch (error) {
        console.error(error);
    } 
}
startServer();