const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

const match = html.match(/<div style="display: grid;[^>]*>/);
if (match) {
    console.log(match[0]);
} else {
    console.log('No grid found');
}
