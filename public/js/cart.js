// public/js/cart.js
const CART_KEY = 'khruathai_cart';

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
    const optionsStr = JSON.stringify(item.options || []);
    let existing = cart.find(c => c.id === item.id && JSON.stringify(c.options || []) === optionsStr);
    
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
        floatBtn.href = '/booking.html';
        floatBtn.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span id="floating-cart-badge">0</span>
        `;
        document.body.appendChild(floatBtn);
    }
    
    document.getElementById('floating-cart-badge').innerText = totalItems;
    
    // Do not show floating cart inside booking.html
    if (window.location.pathname.includes('booking.html')) {
        floatBtn.style.display = 'none';
        return;
    }
    
    if (totalItems > 0) {
        floatBtn.style.display = 'flex';
    } else {
        floatBtn.style.display = 'none';
    }
}

function showCartToast(qty) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        document.body.appendChild(toast);
    }
    
    const lang = document.documentElement.lang || 'en';
    toast.innerHTML = lang === 'th' ? 
        `<i class="fas fa-check-circle" style="color:#4CAF50; margin-right:10px;"></i> เพิ่ม <b>${qty}</b> รายการลงตะกร้าเรียบร้อย` :
        `<i class="fas fa-check-circle" style="color:#4CAF50; margin-right:10px;"></i> Added <b>${qty}</b> items to cart`;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

document.addEventListener('DOMContentLoaded', updateFloatingCart);
