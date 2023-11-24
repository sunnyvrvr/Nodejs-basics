document.addEventListener('DOMContentLoaded', () => {
    fetch('/cartlist')
    .then((response) => response.json())
    .then((cart) => displayCart(cart));
});

function displayCart(cart) {
    console.log(cart);
    const cartTableBody = document.querySelector('#cartTable tbody');
    
    // 기존 테이블 내용을 비우고 새로운 내용으로 업데이트-초기화 중요
    cartTableBody.innerHTML = '';
    console.log(cartTableBody);
    
    if(!cart) {
        alert('카트가 비어있습니다')
    } 
    
    cart.forEach((item) => {
        const row = document.createElement('tr');        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <span class="quantity" id="quantity-${item.id}">${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
                <button onclick="decreaseQuantity(${item.id})">-</button>        
            </td>
            <td><button onlcick="removeFromCart(${item.id}")>Remove</button></td>
            `;
            cartTableBody.appendChild(row); 
        })
}

function increaseQuantity (productId) {
        updateQuantity(productId, 1)
    }
function decreaseQuantity (productId) {
        updateQuantity(productId, -1)   
    }
function updateQuantity(productId, change) {
    fetch(`/update-quantity/${productId}?change=${change}`, { method: 'POST' })
        .then((response) => response.json())
        .then((cart) => {
            displayCart(cart);
        })
    }

function removeFromCart (productId) {
    fetch(`/remove-from-cart/${productId}`, { method: 'POST'})
        .then((response) => response.json())
        .then((cart) => {
            displayCart(cart);
        })
}        