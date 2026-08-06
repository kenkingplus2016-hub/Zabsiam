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
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateFloatingCart();
    } catch (e) {
        alert('⚠️ ระบบตะกร้าสินค้าไม่สามารถทำงานได้ เนื่องจากเบราว์เซอร์ของคุณปิดกั้นการบันทึกข้อมูล (Block Cookies / LocalStorage)\n\nกรุณาปิดโหมดไม่ระบุตัวตน (Incognito) หรือตั้งค่าอนุญาต Cookie ก่อนทำการสั่งซื้อครับ');
        throw e;
    }
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
        floatBtn.href = 'booking.html';
        floatBtn.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <span id="floating-cart-badge">0</span>
        `;
        document.body.appendChild(floatBtn);
    }
    
    document.getElementById('floating-cart-badge').innerText = totalItems;
    
    // Force update href in case it was created with the old absolute path
    if (floatBtn.getAttribute('href') === '/booking.html') {
        floatBtn.href = 'booking.html';
    }
    
    // Update top nav booking link to show cart icon
    const navBooking = document.getElementById('nav-booking');
    if (navBooking) {
        if (!document.getElementById('nav-cart-badge-inner')) {
            navBooking.style.position = 'relative';
            navBooking.style.paddingRight = '15px';
            navBooking.style.display = 'inline-flex';
            navBooking.style.alignItems = 'center';
            navBooking.innerHTML = `<i class="fas fa-shopping-cart" style="font-size: 1.3rem;"></i>
                <span id="nav-cart-badge-inner" style="position:absolute; top:-8px; right:-5px; background:#FF3B30; color:white; font-size:0.75rem; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display:none;">0</span>`;
        }
        
        const navBadge = document.getElementById('nav-cart-badge-inner');
        if (navBadge) {
            navBadge.innerText = totalItems;
            if (totalItems > 0) {
                navBadge.style.display = 'flex';
            } else {
                navBadge.style.display = 'none';
            }
        }
    }
    
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
