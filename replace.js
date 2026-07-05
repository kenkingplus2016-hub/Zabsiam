const fs = require('fs');
let content = fs.readFileSync('./data/classic_menu.json', 'utf8');
content = content.replace(/Nam Tok Suea Rong Hai/g, 'Nam Tok Crying Tiger');
fs.writeFileSync('./data/classic_menu.json', content, 'utf8');
