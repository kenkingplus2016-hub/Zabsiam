const fs = require('fs');

let deliveryHtml = fs.readFileSync('public/delivery.html', 'utf8');

// Replace standard HTML display
deliveryHtml = deliveryHtml.replace('Suea Rong Hai (Weeping Tiger Beef)', 'Suea rong hai Crying Tiger Beef');

// Replace the JavaScript addToCart payload name
deliveryHtml = deliveryHtml.replace("name: 'Suea Rong Hai (Tray)'", "name: 'Suea rong hai Crying Tiger Beef (Tray)'");

fs.writeFileSync('public/delivery.html', deliveryHtml, 'utf8');

// Also update the LLMs data
try {
    let llms = fs.readFileSync('public/llms.txt', 'utf8');
    llms = llms.replace('Suea Rong Hai (Weeping Tiger Beef Tray)', 'Suea rong hai Crying Tiger Beef (Tray)');
    fs.writeFileSync('public/llms.txt', llms, 'utf8');
    fs.writeFileSync('public/menu-ai-data.txt', llms, 'utf8'); // Assuming they are identical
} catch(e) {}

console.log('Successfully renamed Suea Rong Hai');
