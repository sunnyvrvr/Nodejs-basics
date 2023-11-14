const http = require('http');

const server = http.createServer((req, res) => {
    //헤더
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    //본문(Body)
    res.write('<H1>나의 첫번째 WAS 서버</H1>')
    res.end('<P>안녕하세요~~</P>')
});

server.listen(3000, () => {
    console.log('서버가 300번');
})