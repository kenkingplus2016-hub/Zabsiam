const fs = require('fs');
let html = fs.readFileSync('public/canapes.html', 'utf8');

const topSplit = html.indexOf('<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">');
const bottomSplit = html.indexOf('</section>');

console.log("top length:", topSplit);
console.log("bottom start:", bottomSplit);
console.log("total length:", html.length);
