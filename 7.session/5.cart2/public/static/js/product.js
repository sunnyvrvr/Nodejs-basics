document.addEventListener('DOMContentLoaded', () => {
    fetch('/products') //fetch 자체가 비동기- Promise 리턴값
    .then((response) => response.json())
    .then((products) => displayProducts(products));
});
    

function displayProducts(products) {
    //  console.log(products);
    const productTableBody = document.querySelector('#productTable tbody');
    console.log(productTableBody);
    
    products.forEach((product) => {
        const row = document.createElement('tr');
        console.log("제품", product);
        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><button onclick="addToCart(${product.id})">담기</button></td>
        `;
        productTableBody.appendChild(row);
    });
}


//버튼을 클릭하면 원하는 URI가 호출된다
//1. 버튼에 액션 추가 v
//2. 함수를 통해서 fetch 를 호출한다

function addToCart(productId) {
    fetch(`/add-to-cart/${productId}`, { method: 'POST' }) 
    .then((response) => response.json())
    .then((data) => {   
        alert(data.message);

        fetch('/cart') 
            .then((response) => response.json())
            .then((cart) => {
                window.location.href = './cart.html';
            });
    });
};
