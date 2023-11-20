const express = require('express');

const nunjucks = require('nunjucks');
const app = express();
const port = 3000;

nunjucks.configure('views', { express: app });
app.set('view engine', 'html');

app.get("/page", (req, res) => {
  const data = {
    title: "마이페이지",
    content: "여기에 들어갈 내용을 입력하세요"
  }
});


app.listen(port, () => {
  console.log(`서버 ${port} 레디...`);
});
