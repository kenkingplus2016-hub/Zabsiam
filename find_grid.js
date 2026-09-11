const fs = require('fs');
let html = fs.readFileSync('public/canapes.html', 'utf8');

const target = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">';
let pos = html.indexOf(target);
while (pos !== -1) {
    console.log(pos);
    pos = html.indexOf(target, pos + 1);
}
