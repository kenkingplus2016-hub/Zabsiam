// public/js/cart.js
const CART_KEY = 'zabsiam_cart';

function getCart() {
    try {
        let cart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateFloatingCart();
}

function addToCart(item) {
    let cart = getCart();
    let existing = cart.find(c => c.id === item.id);
    
    if (existing) {
        existing.qty += parseInt(item.qty);
    } else {
        cart.push(item);
    }
    
    saveCart(cart);
    showCartToast(item.qty);
}

function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

function updateCartQty(index, newQty) {
    let cart = getCart();
    if (newQty > 0) {
        cart[index].qty = newQty;
        saveCart(cart);
    }
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateFloatingCart();
}

function updateFloatingCart() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    
    let floatBtn = document.getElementById('floating-cart');
    if (!floatBtn) {
        floatBtn = document.createElement('a');
        floatBtn.id = 'floating-cart';
        floatBtn.href = 'checkout.html';
        floatBtn.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span id="floating-cart-badge">0</span>
        `;
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.innerHTML = `
            #floating-cart {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: #e65c00;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                z-index: 9999;
                transition: transform 0.2s, background-color 0.2s;
                text-decoration: none;
            }
            #floating-cart:hover {
                transform: scale(1.1);
                background-color: #c44e00;
            }
            #floating-cart-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background-color: #1a433d;
                color: white;
                font-size: 14px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                border: 2px solid white;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(floatBtn);
    }
    
    const badge = document.getElementById('floating-cart-badge');
    badge.innerText = totalItems;
    
    if (totalItems > 0) {
        floatBtn.style.display = 'flex';
    } else {
        floatBtn.style.display = 'none';
    }
}

function showCartToast(qty) {
    const toast = document.createElement('div');
    toast.innerText = 'Added ' + qty + ' item(s) to order!';
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#1a433d';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = '10000';
    toast.style.fontWeight = 'bold';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.transform = 'translateY(20px)';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateFloatingCart();
});
