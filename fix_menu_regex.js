const fs = require('fs');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/menu.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Inject CSS
if (!content.includes('cart.css')) {
    content = content.replace('</head>', '    <link href="css/cart.css" rel="stylesheet">\n</head>');
}
// 2. Inject JS
if (!content.includes('cart.js')) {
    content = content.replace('</body>', '    <script src="js/cart.js"></script>\n</body>');
}

// 3. Regex replace the link
const oldLinkRegex = /<a href="booking\.html\?set=authentic-\${set\.id}" class="inline-block mt-3 bg-dark-green text-gold border-2 border-gold px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-300 hover:bg-gold hover:text-dark-green shadow-md">\s*<i class="fas fa-calendar-check mr-1"><\/i> \${currentLang === 'th' \? 'จองเซตนี้' : 'Book This Set'}\s*<\/a>/g;

const newBtnStr = `<button onclick="event.preventDefault(); addToCart({
                                id: 'authentic-' + set.id,
                                name_th: set.name.th || set.name_th,
                                name_en: set.name.en || set.name_en,
                                price: parseFloat(set.price),
                                qty: 1,
                                category: 'Authentic',
                                unit_th: set.unit?.th || '5 ท่าน',
                                unit_en: set.unit?.en || '5 Persons'
                            })" class="inline-block mt-3 bg-dark-green text-gold border-2 border-gold px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-300 hover:bg-gold hover:text-dark-green shadow-md cursor-pointer">
                                <i class="fas fa-shopping-cart mr-1"></i> \${currentLang === 'th' ? 'เพิ่มลงตะกร้า' : 'Add to Cart'}
                            </button>`;

if (content.match(oldLinkRegex)) {
    content = content.replace(oldLinkRegex, newBtnStr);
    console.log('menu.html Regex replacement successful.');
} else {
    console.log('Regex still did not match in menu.html');
}

fs.writeFileSync(file, content);
