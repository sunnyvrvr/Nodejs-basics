const express = require('express');
const router = express.Router();

app.get('/', (req, res) => {
    res.send('상품간단프로필')
})

app.get('/detail', (req, res) => {
    res.send('상품 상세 정보 ');
})

app.get('/list', (req, res) => {
    res.send('상품 목록');
})

module.exports = router;