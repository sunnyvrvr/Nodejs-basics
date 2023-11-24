const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { createDeflate } = require('zlib');

const app = express();
const port = 3000;

app.use(bodyParser .urlencoded({ extended: true}));
app.use(bodyParser .json());
// req.body -- 저 내용을 파싱해서 가져온다

app.use(session ({
    secret: 'abcd1234',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')));

//세션 정보 출력 미들웨어-사용하지 않을 것임
app.use((req, res, next) => {
    console.log('Session Info:', req.session);
    next();
})

const products = [
    { id: 1, name: 'Product 1', price: 3000 },
    { id: 2, name: 'Product 2', price: 4000 },
    { id: 3, name: 'Product 3', price: 1500 },
];

app.get('/products', (req, res) => {
    res.json(products);
    console.log('Session Info', req.sessionStore.sessions);
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.post('/add-to-cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find((p) => p.id == productId);
    
    if(!product) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다' });
    }
    //세션에서 장바구니 데이터 가져오기
    const cart = req.session.cart || [];

    const existingItem = cart.find((item)=> item.id === productId);

    if(existingItem) {
        existingItem.quantity += 1;
    } else {   
        //선택한 상품을 카트에 담기
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    console.log(cart);
    //업데이트된 장바구니 데이터를 세션에 저장
    req.session.cart = cart;
    res.json({ message: `${product.id} 상품이 장바구니에 추가되었습니다.` , cart});
})

app.get('/cart', (req, res) => {
    const cart =req.session.cart || []; //세션에 있는 cart 정보 or 빈값
    console.log('Session Info', req.sessionStore.sessions);
    res.json(cart);  
});

// cart.html을 제공
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});
// cart.html을 제공
app.post('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.post('/update-quantity/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const change = parseInt(req.query.change);

    if(isNaN(productId) || isNaN(change)) {
        return res.status(400).json({ message: '잘못된 요청입니다.' });
    }
    const cart = req.session.cart || [];

    const item = cart.find((i) => i.id === productId);

    if (!item) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다' })
    }
    item.quantity = Math.max(1, item.quantity + change);
    //업데이트된 장바구니 데이터를 세션에 저장
    req.session.cart = cart;
    res.json(cart);
});

app.post('/remove-from-cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    
    if(isNaN(productId)) {
        return res.status(400).json({ message: '잘못된 요청입니다.' })
    }
    const cart = req.session.cart || [];
    const item = cart.find((i) => i.id === productId);

    remove.item(productId);
})

app.listen(port, () => {
    console.log(`서버 ${port} is ready`)
})


