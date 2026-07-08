const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const files = ['index.html', 'menu.html', 'royal.html', 'delivery.html', 'booking.html', 'desserts.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // If it already has the link, remove it first to ensure clean state
    if (content.includes('href="desserts.html"')) {
        content = content.replace(/<a href="desserts\.html"[^>]*>.*?<\/a>\s*/g, '');
    }

    if (file === 'index.html') {
        content = content.replace(
            /(<a href="booking\.html"[^>]*>)/,
            '<a href="desserts.html">Desserts</a>\n            $1'
        );
    } else {
        const linkClass = file === 'desserts.html' ? 'nav-link active' : 'nav-link';
        // Some pages might not have class="nav-link" on the booking button if they use inline styles
        // Find the line containing href="booking.html" inside <nav> and prepend
        content = content.replace(
            /([ \t]*<a href="booking\.html"[^>]*>)/,
            `$1`.replace(/<a href="booking\.html".*/, '') + `<a href="desserts.html" id="nav-desserts" class="${linkClass}">เมนูของหวาน / Desserts</a>\n$1`
        );
    }
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed ' + file);
});
