let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(event) {
    if (!event.target.classList.contains("add-to-cart")) return;

    const productElement = event.target.closest(".product");
    const quantityInput = productElement.querySelector('.qty-input');
    const quantity = parseInt(quantityInput.value) || 1;

    const productId = parseInt(productElement.getAttribute("data-id"));
    const productName = productElement.getAttribute("data-name");
    const productPrice = parseFloat(productElement.getAttribute("data-price"));

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ 
            id: productId, 
            name: productName, 
            price: productPrice, 
            quantity: quantity 
        });
    }
    quantityInput.value = 1;

    saveCart();
    updateCartUI();
    showAddedToCartFeedback(productElement);
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₹${item.price.toFixed(2)} × ${item.quantity}</span>
                <span class="cart-item-total">Total: ₹${itemTotal.toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.innerText = total.toFixed(2);
    updateCartCount();
}

function adjustQuantity(button, change) {
    const input = button.parentElement.querySelector('.qty-input');
    let value = parseInt(input.value) + change;
    value = Math.max(1, Math.min(99, value));
    input.value = value;
}

function validateQuantity(input) {
    let value = parseInt(input.value);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 99) value = 99;
    input.value = value;
}


function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = totalItems;
        cartCount.style.display = totalItems > 0 ? "block" : "none";
    }
}

function showAddedToCartFeedback(productElement) {
    const button = productElement.querySelector(".add-to-cart");
    const originalText = button.innerText;
    button.innerText = "Added!";
    button.style.backgroundColor = "#28a745";
    
    setTimeout(() => {
        button.innerText = originalText;
        button.style.backgroundColor = "";
    }, 1000);
}

function checkout() {
    alert("Proceeding to checkout... (Implementation pending)");
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("product-list").addEventListener("click", addToCart);
    updateCartUI();
});

document.addEventListener('DOMContentLoaded', function() {
    const cartPanel = document.getElementById('cart-panel');
    let touchStartY = 0;
    let touchEndY = 0;

    cartPanel.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    cartPanel.addEventListener('touchmove', function(e) {
        touchEndY = e.touches[0].clientY;
        const diff = touchEndY - touchStartY;

        if (cartPanel.classList.contains('open') && diff > 0) {
            e.preventDefault();
            cartPanel.style.bottom = `-${diff}px`;
        }
    });

    cartPanel.addEventListener('touchend', function() {
        const diff = touchEndY - touchStartY;
        if (diff > 150) {
            toggleCart();
        }
        cartPanel.style.bottom = '';
        touchStartY = 0;
        touchEndY = 0;
    });
});
