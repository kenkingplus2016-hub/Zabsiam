const fs = require('fs');

const path = 'public/royal.html';
let html = fs.readFileSync(path, 'utf8');

// Replace all instances of 'The Royal Siam Gathering' with 'Cocktails and Canapés'
html = html.replace(/The Royal Siam Gathering/g, 'Cocktails and Canapés');
// In case there's "The Royal Siam Gathering" with Thai somewhere, just the English phrase is enough since it replaces the exact match.

fs.writeFileSync(path, html, 'utf8');
console.log("Replaced title in royal.html");
