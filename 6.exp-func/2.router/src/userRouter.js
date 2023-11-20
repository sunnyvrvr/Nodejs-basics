const express = require('express');
const router = express.Router();

//사용자 기본정보
router.get('/', (req, res) => {
    res.send('사용자 간단 프로필'); 
});

router.get('/profile', (req, res) => {
    res.send('사용자 프로필'); 
});
router.post('/profile', (req, res) => {
    res.send('사용자 프로필'); 
});
router.put('/profile', (req, res) => {
    res.send('사용자 프로필'); 
});
router.delete('/profile', (req, res) => {
    res.send('사용자 프로필'); 
});

router.get('/settings', (req, res) => {
    res.send('사용자 설정'); 
});

module.exports = router;