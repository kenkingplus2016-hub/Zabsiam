const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

// Rename file
const oldJs = path.join(dir, 'js', 'cart.js');
const newJs = path.join(dir, 'js', 'cart_v2.js');

if (fs.existsSync(oldJs)) {
    fs.renameSync(oldJs, newJs);
    console.log("Renamed cart.js to cart_v2.js");
}

// Update HTML files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
    const file = path.join(dir, f);
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('src="js/cart.js"')) {
        content = content.replace(/src="js\/cart\.js"/g, 'src="js/cart_v2.js"');
        fs.writeFileSync(file, content);
        console.log("Updated HTML file: " + f);
    }
});
