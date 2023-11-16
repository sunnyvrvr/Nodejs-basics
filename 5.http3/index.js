const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND= 404;

const users = {};

const server = http.createServer(async (req, res) => {

    try {
        if (req.method ==='GET' && req.url.startsWith('/static/')){
         const filePath = "." + req.url;
            const data = await fs.readFile(filePath);
            const contentType = getContentType(filePath);
            res.writeHead(SUCCESS, {'Content-type': contentType});
            return res.end(data);
        }
        
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./index.html');
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html');                
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);            
            } else if (req.url === '/user') {
                console.log('users');
                res.writeHead(SUCCESS, {'Content-Type': 'text/plain; charset=utf-8'});
                console.log(JSON.stringify(users));
                res.end(JSON.stringify(users));  
            } else {
                const imageMatch = req.url.match(/^\/image\/(.+)$/); 
                if (imageMatch) {
                    const imageName = imageMatch[1];
                    const imagePath = './static/' + imageName;
                }
                try {
                    const filePath = req.url;
                    const contentType = getContentType(filePath);
                    const data = await fs.readFile('./static' + filePath);
                    res.writeHead(SUCCESS, {'Conent-Type': contentType});
                    res.end(data);
                } catch (error) {
                    res.writeHead(NOT_FOUND, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end("Server error")
                }
            }
        } else if (req.method === 'POST') {
            //요청을 생성할 때
            //요청을 request를 파싱해서 처리
            let body = '';

            req.on('data', (data) => { body += data;});
            req.on('end', () => {
                console.log("요청온 내용은??", body);
                const formData = JSON.parse(body);
                console.log("파싱한 후??", formData);

                const username = formData.name;
                console.log("사용자이름은??", username);

                const id = Date.now();
                users[id] = username;
                console.log(users);            
            });
            //결과 response 주는 코드
            res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('등록 성공');
        } else if (req.method === 'PUT') {
            //요청을 수정할 때
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                req.on('end', () => {
                    //다 온 데이터를 기반으로 프로세싱
                    const formData = JSON.parse(body);
                    users[key] = formData.name;
                })
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end("수정 성공"); 
        } else if (req.method === 'DELETE') {
            //요청을 삭제할 때 
            //요청에 대한 파싱
            //1. url에 /users/ 시작하는 걸 찾아서
            //2. 그 뒤에 있는 글자를 읽어서 key로 처리하는 것
            //3. 그 키를 users라는 객체 안에서 삭제
            if (req.url.startsWith('/user')){
            try {
                //url 파싱해서 파일 불러와서, 반환한다.(3줄 정도의 코드)
                const key = req.url.split('/')[2];
                delete users[key];

                //요청에 대한 응답결과를 준다
                res.writeHead(204, {'Content-Type': 'application/json; charset=utf-8'});
                res.end("삭제 성공");
            } catch(error) {
                console.error("에러", err.message);
                res.writeHead(SERVER_ERROR, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end("서버 오류"); 
            }
        }
        }
    } catch(err) {
        console.error("에러", err.message);
        res.writeHead(SERVER_ERROR, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("NOT FOUND"); 
    }   
});

const port = 3000;
server.listen (port, () => {
    console.log(`${port}번 포트 열려있음`);
})

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html': 
            return 'text/html; charset=utf-8';
        case '.js' : 
            return 'application/javascript; charset=utf-8';
        case 'jpg' :
            return 'image/jpg'; // text/html
        case '.css':
            return 'application/javascript; charset=utf-8';
    }
}