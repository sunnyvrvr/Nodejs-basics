const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

const app = express();
const port = 3000;
const dbFile = 'mydb1.db';

const db = new sqlite3.Database(dbFile);

function createTable() {
    db.exec(`CREATE TABLE IF NOT EXISTS ${db_table}`)
    , (err) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    }
}


//DB 초기화 함수
function init_database() {
    return new Promise((resolve, reject) => {
        // DB 초기화 코드 작성
        // CREATE TABLE 
        const sql = fs.readFileSync('init_database.sql', 'utf8');
        //console.log(sql);       
        db.exec(sql, (err) => {
            if (err) {

                if (err.code == 'SQLITE_CONSTRAINT') {
                    console.log('초기화 이미 되어있음. 초기화 Skip');
                } else {
                console.error('초기화 실패', err); //초기화 되어있으면 초기화 찍지 않기
                }
            } else {
                console.error('초기화 성공'); 

            }
        })
    })
}
//서버 URL 
app.get('/:table', (req, res) => {
    //DB로 부터 특정 테이블을 조회하는 코드 작성
    const db_table = req.params.table;

    const query = `SELECT * FROM ${db_table}`
    db.all(query, (err, rows) => {
        res.json(rows);
    })
})
app.get('/:table/:id', (req, res) => {
    const db_table = req.params.table;
    const userId = req.params.id;

    const query = `SELECT * FROM ${db_table} WHERE id=?`;

    db.get(query, [userId], (err, row) => {
        res.send(row);
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