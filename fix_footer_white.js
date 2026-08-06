const fs = require('fs');
const filePath = 'public/royal.html';
let html = fs.readFileSync(filePath, 'utf8');

const oldFooterStart = '<footer class="bg-gradient-to-b from-[#0d1f14] to-black py-10 px-5 text-center border-t-2 border-gold/30 mt-20">';
const newFooterStart = '<footer class="bg-white py-10 px-5 text-center border-t border-gray-200 mt-20">';

const oldText = '<p class="text-xs tracking-[2px] text-white/70 uppercase">';
const newText = '<p class="text-xs tracking-[2px] text-gray-500 uppercase">';

html = html.replace(oldFooterStart, newFooterStart);
html = html.replace(oldText, newText);

fs.writeFileSync(filePath, html, 'utf8');
console.log('Successfully updated footer background to white.');
