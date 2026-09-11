const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Add "Delivery" to navigation
html = html.replace(/<li><a href="meeting-meals\.html">Meeting Meals<\/a><\/li>/g, '<li><a href="meeting-meals.html">Meeting Meals</a></li>\n                        <li><a href="delivery.html">Party Trays Delivery</a></li>');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Added Delivery link to index.html navigation');
