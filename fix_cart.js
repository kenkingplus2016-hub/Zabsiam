const fs = require('fs');

let cartJs = fs.readFileSync('public/cart.js', 'utf8');

cartJs = cartJs.replace(
`function addToCart(name, price, img) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    updateCartUI();
    openCart();
}`,
`function addToCart(name, price, img) {
    // Support object payload
    let itemName = name;
    let itemPrice = price;
    let itemImg = img;
    let itemId = name;
    
    if (typeof name === 'object' && name !== null) {
        itemName = name.name;
        itemPrice = name.price;
        itemImg = name.img;
        itemId = name.id || name.name;
    }
    
    // Convert price to number just in case
    itemPrice = Number(itemPrice);

    const existing = cart.find(item => item.name === itemName || item.id === itemId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: itemId, name: itemName, price: itemPrice, img: itemImg, qty: 1 });
    }
    updateCartUI();
    openCart();
}`
);

fs.writeFileSync('public/cart.js', cartJs, 'utf8');
console.log('Fixed addToCart in public/cart.js');
