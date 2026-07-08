const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

// 1. Fix index.html
let index = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
index = index.replace(/<nav>.*?<\/nav>/s, `<nav>
            <a href="index.html">Home</a>
            <a href="menu.html">Thai Set Menus</a>
            <a href="royal.html">Royal Siam</a>
            <a href="delivery.html">Delivery Box</a>
            <a href="desserts.html">Desserts</a>
            <a href="booking.html" class="book-now-btn">Enquire Now</a>
        </nav>`);
fs.writeFileSync(path.join(dir, 'index.html'), index);

// 2. Fix other files
const files = ['menu.html', 'royal.html', 'delivery.html', 'booking.html', 'desserts.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // We will find the <nav ...> tag and the </nav> tag and replace the inside
    const navRegex = /(<nav[^>]*>)(.*?)(<\/nav>)/s;
    const match = content.match(navRegex);
    if (match) {
        let navStart = match[1];
        
        // Define standard nav HTML
        let newNav = `
        <a href="index.html" id="nav-home" class="nav-link">หน้าแรก / Home</a>
        <a href="menu.html" id="nav-menu" class="nav-link">เซทตำรับไทย / Authentic Thai Sets</a>
        <a href="royal.html" id="nav-royal" class="nav-link">The Royal Siam Gathering</a>
        <a href="delivery.html" id="nav-delivery" class="nav-link">ดิลิเวอรีบ็อกซ์เซต / Delivery Box Sets</a>
        <a href="desserts.html" id="nav-desserts" class="nav-link">เมนูของหวาน / Desserts</a>
        <a href="booking.html" id="nav-booking" class="nav-link">จองงาน / Booking</a>
    `;

        // Apply active class based on file
        if (file === 'menu.html') newNav = newNav.replace('id="nav-menu" class="nav-link"', 'id="nav-menu" class="nav-link active"');
        if (file === 'royal.html') newNav = newNav.replace('id="nav-royal" class="nav-link"', 'id="nav-royal" class="nav-link active"');
        if (file === 'delivery.html') newNav = newNav.replace('id="nav-delivery" class="nav-link"', 'id="nav-delivery" class="nav-link active"');
        if (file === 'booking.html') newNav = newNav.replace('id="nav-booking" class="nav-link"', 'id="nav-booking" class="nav-link active"');
        if (file === 'desserts.html') newNav = newNav.replace('id="nav-desserts" class="nav-link"', 'id="nav-desserts" class="nav-link active"');

        content = content.replace(navRegex, `$1${newNav}$3`);
        fs.writeFileSync(path.join(dir, file), content);
        console.log('Fixed ' + file);
    }
});
