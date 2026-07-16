const fs = require('fs');
let html = fs.readFileSync('public/menu.html', 'utf8');

html = html.replace(/customChoicesArr\.push\(choiceText\); \/\/ \{[\s\S]*?\/\/ extra: extra\s*\/\/ \}\);/g, 'customChoicesArr.push(choiceText);');

fs.writeFileSync('public/menu.html', html, 'utf8');
console.log("Fixed menu.html syntax.");
