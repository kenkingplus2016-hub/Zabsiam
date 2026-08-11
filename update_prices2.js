const fs = require('fs');
let html = fs.readFileSync('public/catering.html', 'utf8');

const startIdx = html.indexOf('<section class="full-menu-section" id="street-food-menu"');
const endIdx = html.indexOf('<!-- Fine Dining Menu Section -->');

if (startIdx !== -1 && endIdx !== -1) {
    let section = html.substring(startIdx, endIdx);

    // Strip existing prices first
    section = section.replace(/\n\s*<span class="menu-item-price"[\s\S]*?<\/span><\/span>/g, '');

    let currentCategory = '';
    
    section = section.replace(/(<div class="menu-subcategory">.*?<\/div>)|(<div class="menu-category">.*?<\/div>)|(<span class="menu-item-title">(.*?)<\/span>)/g, (match, subcatMatch, catMatch, titleMatch, title) => {
        if (subcatMatch || catMatch) {
            currentCategory = match;
            return match;
        }
        if (titleMatch) {
            let name = title.toLowerCase();
            let trayPrice = 72; // default 9 * 8
            
            if (currentCategory.includes('Salads & Thai Favourites')) {
                trayPrice = 64; // 8 * 8
            } else if (currentCategory.includes('Fried & Light Bites') || name.includes('velout')) {
                trayPrice = 16; // 2 * 8
            } else {
                let pricePerPortion = 9;
                if (name.includes('beef') || name.includes('duck')) pricePerPortion = 11;
                else if (name.includes('prawn') || name.includes('shrimp') || name.includes('crab') || name.includes('goong')) pricePerPortion = 12;
                else if (name.includes('sea bass') || name.includes('pla ')) pricePerPortion = 14;
                else if (name.includes('rice') && !name.includes('fried') && !name.includes('sticky')) pricePerPortion = 4; 
                else if (name.includes('vegetable') || name.includes('broccoli') || name.includes('asparagus') || name.includes('cabbage') || name.includes('morning glory') || name.includes('kale') || name.includes('pak choi')) pricePerPortion = 7;
                else if (name.includes('mango sticky rice') || name.includes('red ruby') || name.includes('bua loy') || name.includes('lod chong')) pricePerPortion = 7;
                else if (name.includes('seasonal fresh fruit')) pricePerPortion = 6;
                trayPrice = pricePerPortion * 8;
            }
            
            return match + '\n                                <span class="menu-item-price" style="color: #ff8c00; font-weight: 700; display: block; margin-top: 5px; font-size: 1.1rem;">£' + trayPrice + '.00 <span style="font-size: 0.85rem; color: #aaa; font-weight: 400;">(Tray for 7-8 Guests)</span></span>';
        }
    });

    html = html.substring(0, startIdx) + section + html.substring(endIdx);
    fs.writeFileSync('public/catering.html', html);
    console.log('Prices updated');
} else {
    console.log('Could not find section');
}
