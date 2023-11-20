const express = require("express");
const app = express();
const port = 3000;

// EJS를 뷰 엔진으로 설정한다
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // 뷰 엔진 (템플릿 엔진)을 통해서 렌더링을 해주어야 함
  // 렌더링(rendering) = 컨텐츠를 삽입/변경하는 과정

  // views 폴더 안의 index.ejs를 읽어서 렌더링
  res.render("index", { title: "Express앱", message: "EJS를 처음 사용해 보는 중" });
});
app.get("/greeting", (req, res) => {
  const username = "정선진";
  res.render("greeting", { username: username });
});

app.get("/welcome", (req, res) => {
  const isAdmin = false;
  res.render("welcome", { isAdmin: isAdmin });
});

app.get("/fruits", (req, res) => {
  const fruits = ["Apple", "Banana", "Grape"];
  res.render("fruits", { fruits: fruits });
});

app.get("/page", (req, res) => {
  const data = {
    title: "마이 페이지",
    content: "여기에 본문이 들어갈 내용을 작성하시오....",
  };
  res.render("main", data);
});

app.listen(port, () => {
  console.log(`서버 ${port} 레디...`);
});
