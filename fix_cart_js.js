const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/js/cart.js';
let content = fs.readFileSync(file, 'utf8');

const oldCode = `function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}`;

const newCode = `function getCart() {
    try {
        let cart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(cart) ? cart : [];
    } catch (e) {
        return [];
    }
}`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(file, content);
    console.log("cart.js fixed!");
} else {
    console.log("oldCode not found in cart.js");
}
