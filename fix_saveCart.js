const fs = require('fs');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/js/cart.js';
let content = fs.readFileSync(file, 'utf8');

const oldCode = `function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateFloatingCart();
}`;

const newCode = `function saveCart(cart) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateFloatingCart();
    } catch (e) {
        alert('⚠️ ระบบตะกร้าสินค้าไม่สามารถทำงานได้ เนื่องจากเบราว์เซอร์ของคุณปิดกั้นการบันทึกข้อมูล (Block Cookies / LocalStorage)\\n\\nกรุณาปิดโหมดไม่ระบุตัวตน (Incognito) หรือตั้งค่าอนุญาต Cookie ก่อนทำการสั่งซื้อครับ');
        throw e;
    }
}`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(file, content);
    console.log("Updated saveCart in cart.js");
} else {
    console.log("Could not find saveCart");
}
