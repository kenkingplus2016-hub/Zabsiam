const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

// Add !important to all #e65c00 in the Duke of York Square section
content = content.replace(/color: #e65c00;/g, 'color: #e65c00 !important;');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added !important to red-orange styles.');
