document.addEventListener('DOMContentLoaded', () => {
    fetch('/cartlist')
    .then((response) => response.json())
    .then((cart) => displayCart(cart));
});

function displayCart(cart) {
    console.log(cart);
    const cartTableBody = document.querySelector('#cartTable tbody');
    console.log(cartTableBody);
    // 이전 내용 지우기
    cartTableBody.innerHTML = '';
    
    cart.forEach((item) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>count.item
        <button onclick="add(${item.id})">+</button>
        <button onclick="minus(${item.id})">-</button>        
        </td>
        `;
        cartTableBody.appendChild(row);
    })
}

function add(){

}
function minus(){
    
}