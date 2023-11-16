const http = require('http');
const fs = require('fs').promises;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND= 404;

const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    try {
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./index.html');
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html');                
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);            
            } else if (req.url === '/images/dog.jpg') {
                const data = await fs.readFile('./images/dog.jpg');                
                res.writeHead(SUCCESS, {'Content-Type': 'image/jpg'});
                res.end(data);  
            } else {
                res.writeHead(NOT_FOUND, {'Content-Type': 'text/html; charset=utf-8'});
                res.end('NOT FOUND, 없음');
            }
        } else if (req.method === 'POST') {
            res.writeHead(201);
            res.end('등록 성공');
        } else if (req.method === 'PUT') {
            //요청을 수정할 때
            res.end("수정 성공"); 
        } else if (req.method === 'DELETE') {
            //요청을 수정할 때 
            res.end("삭제 성공");
        }
    } catch(err) {
        console.error(err);
        res.writeHead(SERVER_ERROR, { 'Content-Type': 'text/html, charset=utf-8'});
        res.end("서버 오류"); 
    }
});
//서버의 포트 정의
const port = 3000;
server.listen(port, () => {
    console.log(`${port}번 포트 열려있음`);
})