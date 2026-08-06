const fs = require('fs');
const filePath = 'public/royal.html';
let html = fs.readFileSync(filePath, 'utf8');

html = html.replace('text-black/65', 'text-white/70');

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated footer color.');
