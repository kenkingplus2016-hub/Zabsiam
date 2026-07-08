const fs = require('fs');
const path = require('path');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html';
let content = fs.readFileSync(file, 'utf8');

// Find where "Delivery conditions bilingual" starts and remove it
const startIdx = content.indexOf('// Delivery conditions bilingual');
if (startIdx !== -1) {
    const endIdx = content.indexOf('        renderMenu();', startIdx);
    if (endIdx !== -1) {
        content = content.slice(0, startIdx) + content.slice(endIdx);
        fs.writeFileSync(file, content);
        console.log('Fixed JS crash');
    } else {
        console.log('Could not find end index');
    }
} else {
    console.log('Could not find start index');
}
