const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const files = ['menu.html', 'royal.html', 'delivery.html', 'booking.html', 'desserts.html'];

const styleBlock = `
<style>
  html[lang="th"] .nav-en { display: none !important; }
  html[lang="th"] .nav-th { display: inline !important; }
  html[lang="en"] .nav-th { display: none !important; }
  html[lang="en"] .nav-en { display: inline !important; }
</style>
`;

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Inject CSS if not present
    if (!content.includes('html[lang="th"] .nav-en')) {
        content = content.replace('</head>', styleBlock + '</head>');
    }

    // Define standard nav HTML with language spans
    let newNav = `
        <a href="index.html" id="nav-home" class="nav-link"><span class="nav-th">หน้าแรก</span><span class="nav-en">Home</span></a>
        <a href="menu.html" id="nav-menu" class="nav-link"><span class="nav-th">เซตตำรับไทย</span><span class="nav-en">Authentic Thai Sets</span></a>
        <a href="royal.html" id="nav-royal" class="nav-link">The Royal Siam Gathering</a>
        <a href="delivery.html" id="nav-delivery" class="nav-link"><span class="nav-th">ดิลิเวอรีบ็อกซ์เซต</span><span class="nav-en">Delivery Box Sets</span></a>
        <a href="desserts.html" id="nav-desserts" class="nav-link"><span class="nav-th">ของหวาน</span><span class="nav-en">Desserts</span></a>
        <a href="booking.html" id="nav-booking" class="nav-link"><span class="nav-th">จองงาน</span><span class="nav-en">Booking</span></a>
    `;

    // Apply active class based on file
    if (file === 'menu.html') newNav = newNav.replace('id="nav-menu" class="nav-link"', 'id="nav-menu" class="nav-link active"');
    if (file === 'royal.html') newNav = newNav.replace('id="nav-royal" class="nav-link"', 'id="nav-royal" class="nav-link active"');
    if (file === 'delivery.html') newNav = newNav.replace('id="nav-delivery" class="nav-link"', 'id="nav-delivery" class="nav-link active"');
    if (file === 'booking.html') newNav = newNav.replace('id="nav-booking" class="nav-link"', 'id="nav-booking" class="nav-link active"');
    if (file === 'desserts.html') newNav = newNav.replace('id="nav-desserts" class="nav-link"', 'id="nav-desserts" class="nav-link active"');

    // Replace <nav> contents
    const navRegex = /(<nav[^>]*>)(.*?)(<\/nav>)/s;
    content = content.replace(navRegex, `$1${newNav}$3`);
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed languages for ' + file);
});
