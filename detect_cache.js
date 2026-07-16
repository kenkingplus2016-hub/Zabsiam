const fs = require('fs');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/booking.html';
let content = fs.readFileSync(file, 'utf8');

const oldCode = `document.addEventListener("DOMContentLoaded", () => { renderCartSummary(); });`;
const newCode = `document.addEventListener("DOMContentLoaded", () => { 
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('set')) {
            alert('⚠️ ตรวจพบว่าเบราว์เซอร์ของคุณจำโค้ดเก่าของหน้า Delivery/Desserts เอาไว้!\\n(เพราะมี ?set=... ติดมาใน URL)\\n\\nรบกวนกลับไปที่หน้า Delivery แล้วกดปุ่ม Ctrl + F5 (หรือเคลียร์แคช) ก่อนกดสั่งซื้ออีกครั้งครับ');
            window.location.href = 'delivery.html';
            return;
        }
        
        if (window.location.protocol === 'file:') {
            alert('⚠️ คำเตือน: คุณกำลังเปิดไฟล์เว็บจากเครื่องโดยตรง (file://)\\nระบบตะกร้าสินค้าจะไม่ทำงานข้ามหน้าต่างกันเนื่องจากระบบความปลอดภัยของ Google Chrome\\n\\nกรุณาทดสอบบนเว็บไซต์จริง หรือรันผ่าน Local Web Server ครับ!');
        }

        renderCartSummary(); 
    });`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(file, content);
    console.log("Injected cache detection in booking.html");
} else {
    console.log("Could not find oldCode");
}
