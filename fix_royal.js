const fs = require('fs');
const path = require('path');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/royal.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Rename onclick functions to avoid collision with cart.js
content = content.replace(/onclick="clearCart\(\)"/g, 'onclick="clearLocalCart()"');
content = content.replace(/onclick="updateCart\(/g, 'onclick="updateLocalCart(');

// 2. Inject function definitions right before closing </script> tag
const functionsToInject = `
    function updateLocalCart(id, delta) {
        if (!cart[id]) cart[id] = 0;
        cart[id] += delta;
        if (cart[id] < 0) cart[id] = 0;
        
        // update UI
        const qtyEl = document.getElementById('qty-' + id);
        if (qtyEl) qtyEl.innerText = cart[id];
        
        updateCartTotal();
    }
    
    function updateCartTotal() {
        let totalItems = 0;
        let totalPrice = 0;
        for (const [id, qty] of Object.entries(cart)) {
            if (qty > 0) {
                totalItems += qty;
                // find price
                for (const cat of royalCategories) {
                    const item = cat.items.find(i => i.id === id);
                    if (item) {
                        totalPrice += item.price * qty;
                        break;
                    }
                }
            }
        }
        document.getElementById('cart-item-count').innerText = totalItems;
        document.getElementById('cart-total-price').innerText = totalPrice.toFixed(2);
    }
    
    function clearLocalCart() {
        cart = {};
        renderCanapesMenu();
        updateCartTotal();
    }
    
    window.bookCustomCanapes = function() {
        let added = 0;
        for (const [id, qty] of Object.entries(cart)) {
            if (qty > 0) {
                // find item
                let foundItem = null;
                for (const cat of royalCategories) {
                    const item = cat.items.find(i => i.id === id);
                    if (item) {
                        foundItem = item;
                        break;
                    }
                }
                
                if (foundItem) {
                    addToCart({
                        id: 'royal-' + id,
                        name_th: foundItem.name.th,
                        name_en: foundItem.name.en,
                        price: foundItem.price,
                        qty: qty,
                        category: "Authentic",
                        unit_th: "ชุด",
                        unit_en: "Set"
                    });
                    added += qty;
                }
            }
        }
        
        if (added > 0) {
            clearLocalCart();
            // cart.js toast already fired
        } else {
            alert(currentLang === 'th' ? "กรุณาเลือกรายการก่อนครับ" : "Please select items first");
        }
    }
`;

content = content.replace('renderCanapesMenu();\n    }', 'renderCanapesMenu();\n    }\n' + functionsToInject);

fs.writeFileSync(file, content);
console.log('Fixed royal.html logic');
