const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<H1>Hello Node!</H1>');
    res.end('<P>안녕하세요~~</P>');
}).listen(8000, () => { console.log('8000번 포트 생성완료');});

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<H1>Hello Node!</H1>');
    res.end('<P>안녕하세요~~</P>');
}).listen(8001, () => { console.log('8001번 포트 생성완료');});

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<H1>Hello Node!</H1>');
    res.end('<P>안녕하세요~~</P>');
}).listen(8002, () => { console.log('8002번 포트 생성완료');});
