const express = require('express');
const nunjucks = require('nunjucks');

const app = express;
const nunjucks = require('nunjucks');

nunjucks.configure('views', { express: app });
app.set('view engine', 'html');

app.get('/page', (req, res) => {
  const data = {
      title: "마이 페이지",
      content: "여기에 본문에 들어갈 내용을 작성하시오"
  };
  res.render('page', data);
});

const port = 3000;
app.listen(port, () => {
  console.log(`서버 ${port} 준비`);
});
