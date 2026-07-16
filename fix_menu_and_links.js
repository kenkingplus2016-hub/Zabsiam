const fs = require('fs');

function fixMenuFile() {
    const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/menu.html';
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Inject CSS
    if (!content.includes('cart.css')) {
        content = content.replace('</head>', '    <link href="css/cart.css" rel="stylesheet">\n</head>');
    }
    // 2. Inject JS
    if (!content.includes('cart.js')) {
        content = content.replace('</body>', '    <script src="js/cart.js"></script>\n</body>');
    }
    
    // 3. Replace the link
    const oldLinkStr = `<a href="booking.html?set=authentic-\${set.id}" class="inline-block mt-3 bg-dark-green text-gold border-2 border-gold px-5 py-2 rounded-full font-bold text-sm no-underline transition-all duration-300 hover:bg-gold hover:text-dark-green shadow-md">
                                <i class="fas fa-calendar-check mr-1"></i> \${currentLang === 'th' ? 'จองเซตนี้' : 'Book This Set'}
                            </a>`;
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
    
    if (content.includes(oldLinkStr)) {
        content = content.replace(oldLinkStr, newBtnStr);
        console.log('menu.html updated successfully.');
    } else {
        console.log('Could not find link in menu.html');
    }
    
    fs.writeFileSync(file, content);
}

function fixDeliveryAndDesserts(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Remove the QR code container entirely since we are using floating cart now
    const qrRegex = /<div style="text-align: center;" title="สแกนเพื่อจอง \/ Scan to Book">[\s\S]*?<\/div>\s*<\/div>/g;
    content = content.replace(qrRegex, '</div>');
    
    // Replace the direct href to booking.html with an openModal button
    const oldLinkRegex = /<a href="booking.html\?set=classic-\${set.id}"(.*?)>\s*<i class="fas fa-calendar-check"><\/i> \${currentLang === 'th' \? 'จองเซตนี้' : 'Book This Set'}\s*<\/a>/g;
    
    content = content.replace(oldLinkRegex, (match, attrs) => {
        return `<button onclick="openModal('\${set.id}')" style="cursor:pointer; display:inline-block; border:none; ${attrs.replace('style="display:inline-block; ', 'style="')} >
                                <i class="fas fa-shopping-cart"></i> \${currentLang === 'th' ? 'เลือกรายการ' : 'Select Items'}
                            </button>`;
    });

    fs.writeFileSync(file, content);
    console.log(file + ' updated successfully.');
}

fixMenuFile();
fixDeliveryAndDesserts('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/delivery.html');
fixDeliveryAndDesserts('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html');
