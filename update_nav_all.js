const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // First, remove the existing "Party Trays Delivery" or similar if we already added it so we don't duplicate
    html = html.replace(/\s*<li><a href="delivery\.html">Party Trays.*?<\/a><\/li>/g, '');
    
    // Now inject it cleanly after Meeting Meals
    html = html.replace(
        /<li><a href="meeting-meals\.html">Meeting Meals<\/a><\/li>/g,
        '<li><a href="meeting-meals.html">Meeting Meals</a></li>\n                        <li><a href="delivery.html">Party Trays &amp; Delivery</a></li>'
    );
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Updated navigation in', file);
});
