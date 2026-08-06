const fs = require('fs');
const path = require('path');

const repoMenu = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html';
const localMenu = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html';
const repoCart = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\js\\cart.js';
const localCart = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\js\\cart.js';

try {
    // 1. Update menu.html
    let menuHtml = fs.readFileSync(repoMenu, 'utf8');

    // Replace script src
    menuHtml = menuHtml.replace(/<script src="js\/cart_v2\.js"><\/script>/, '<script src="js/cart.js"></script>');

    // Add Quantity and Add button to modal
    if (!menuHtml.includes('modal-add-btn')) {
        const oldDesc = `<div id="modal-desc" class="text-gray-600 mb-6 text-[15px] leading-relaxed">
                Experience the authentic taste of Thailand with our signature street food dish. Made fresh to order with premium ingredients.
            </div>`;
        const newDesc = `<div id="modal-desc" class="text-gray-600 mb-6 text-[15px] leading-relaxed">
                Experience the authentic taste of Thailand with our signature street food dish. Made fresh to order with premium ingredients.
            </div>
            
            <div class="mt-2 mb-6 flex gap-3">
                <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden w-28">
                    <button id="modal-qty-minus" class="w-10 h-11 bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-lg transition-colors">-</button>
                    <input type="number" id="modal-qty" value="1" min="1" class="w-8 h-11 text-center border-0 focus:ring-0 p-0 text-base font-bold bg-white text-gray-800" readonly>
                    <button id="modal-qty-plus" class="w-10 h-11 bg-gray-50 hover:bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-lg transition-colors">+</button>
                </div>
                <button id="modal-add-btn" class="flex-1 bg-[#e65c00] text-white font-bold rounded-lg hover:bg-[#c44e00] transition-colors flex items-center justify-center gap-2 text-lg">
                    <i class="fas fa-shopping-cart"></i> Add to Order
                </button>
            </div>`;
        menuHtml = menuHtml.replace(oldDesc, newDesc);
    }

    // Update JS in menu.html
    if (!menuHtml.includes('currentQty = 1;')) {
        const oldJs = /document\.getElementById\('modal-price'\)\.innerText = '£' \+ p1\.toFixed\(2\);\s*\/\//;
        const newJs = `document.getElementById('modal-price').innerText = '£' + p1.toFixed(2);
            
            let currentQty = 1;
            document.getElementById('modal-qty').value = 1;
            
            document.getElementById('modal-qty-minus').onclick = () => {
                if (currentQty > 1) { currentQty--; document.getElementById('modal-qty').value = currentQty; }
            };
            document.getElementById('modal-qty-plus').onclick = () => {
                currentQty++; document.getElementById('modal-qty').value = currentQty;
            };
            
            document.getElementById('modal-add-btn').onclick = () => {
                if (typeof addToCart === 'function') {
                    addToCart({
                        id: item.id,
                        name: item.en || item.th,
                        price: p1,
                        qty: parseInt(document.getElementById('modal-qty').value),
                        img: imgSrc
                    });
                    closeProductModal();
                } else {
                    alert("Cart system is currently initializing, please try again in a moment.");
                }
            };
            
            //`;
        menuHtml = menuHtml.replace(oldJs, newJs);
    }

    fs.writeFileSync(repoMenu, menuHtml, 'utf8');
    if (fs.existsSync(localMenu)) {
        fs.writeFileSync(localMenu, menuHtml, 'utf8');
    }
    console.log("Updated menu.html with Add to Cart UI.");

    // 2. Rewrite cart.js
    const newCartJs = `// public/js/cart.js
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
        floatBtn.innerHTML = \`
            <i class="fas fa-shopping-cart"></i>
            <span id="floating-cart-badge">0</span>
        \`;
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.innerHTML = \`
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
        \`;
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
`;

    fs.writeFileSync(repoCart, newCartJs, 'utf8');
    if (fs.existsSync(localCart)) {
        fs.writeFileSync(localCart, newCartJs, 'utf8');
    }
    console.log("Rewrote cart.js successfully.");

} catch (e) {
    console.error(e);
}
