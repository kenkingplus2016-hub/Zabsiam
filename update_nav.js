const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

// 1. Update index.html
let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
if (!indexHtml.includes('href="desserts.html"')) {
    indexHtml = indexHtml.replace(
        '<a href="booking.html" class="book-now-btn">',
        '<a href="desserts.html">Desserts</a>\n            <a href="booking.html" class="book-now-btn">'
    );
    fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
}

// 2. Update other HTML files
const files = ['menu.html', 'royal.html', 'delivery.html', 'booking.html'];
let menuContent = '';
files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (!content.includes('href="desserts.html"')) {
        content = content.replace(
            /<a href="booking\.html" id="nav-booking" class="nav-link">/g,
            '<a href="desserts.html" id="nav-desserts" class="nav-link">ของหวาน / Desserts</a>\n        <a href="booking.html" id="nav-booking" class="nav-link">'
        );
        fs.writeFileSync(path.join(dir, file), content);
    }
    if (file === 'menu.html') menuContent = content; // Save for generating desserts.html
});

// 3. Create desserts.html
if (!fs.existsSync(path.join(dir, 'desserts.html'))) {
    let dessertsHtml = menuContent;
    // Update active nav state
    dessertsHtml = dessertsHtml.replace('id="nav-menu" class="nav-link active"', 'id="nav-menu" class="nav-link"');
    dessertsHtml = dessertsHtml.replace('id="nav-desserts" class="nav-link"', 'id="nav-desserts" class="nav-link active"');
    
    // Update Title & Hero
    dessertsHtml = dessertsHtml.replace(/<title>.*?<\/title>/, '<title>Desserts Menu - Khrua Thai London</title>');
    dessertsHtml = dessertsHtml.replace(/id="hero-title"[^>]*>.*?<\/h1>/, 'id="hero-title" class="font-manorah text-gold text-4xl md:text-6xl mb-2.5 tracking-[2px]">Thai Desserts</h1>');
    dessertsHtml = dessertsHtml.replace(/id="hero-subtitle"[^>]*>.*?<\/p>/, 'id="hero-subtitle" class="text-black text-lg md:text-xl max-w-[700px] mx-auto leading-relaxed">Authentic & Premium Thai Sweets</p>');
    dessertsHtml = dessertsHtml.replace(/id="hero-desc"[^>]*>.*?<\/p>/, 'id="hero-desc" class="mt-4 text-sm md:text-base opacity-90 text-black"></p>');
    
    // Update Container
    dessertsHtml = dessertsHtml.replace(
        /<div id="menu-container".*?<\/div>/s, 
        '<div id="menu-container" style="text-align:center; padding: 50px; font-size: 1.2rem; color: #666; font-weight: bold;">เมนูของหวานกำลังจะมาเร็วๆ นี้ / Desserts menu is coming soon!</div>'
    );
    
    // Remove JS that tries to load menu data
    dessertsHtml = dessertsHtml.replace(/<script>.*?<\/script>/s, '<script>function changeLang(l, b){}</script>');
    
    fs.writeFileSync(path.join(dir, 'desserts.html'), dessertsHtml);
}

console.log('Navigation updated and desserts.html created successfully.');
