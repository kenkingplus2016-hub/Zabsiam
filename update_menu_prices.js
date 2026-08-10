const fs = require('fs');
const path = require('path');

const menuFile = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
let menuData = JSON.parse(fs.readFileSync(menuFile, 'utf8'));

// Curries pricing
const curryPrices = {
    chicken: { s1: 6.95, s2: 12.95, s4: 26.95 },
    pork:    { s1: 6.95, s2: 12.95, s4: 26.95 },
    beef:    { s1: 8.95, s2: 17.90, s4: 34.95 },
    prawn:   { s1: 7.95, s2: 15.90, s4: 30.95 },
    veg:     { s1: 6.50, s2: 12.95, s4: 25.50 }
};

// Kra Pao pricing
const kraPaoPrices = { s1: 6.95, s2: 12.95, s4: 26.95 };

// Weights
const curryWeights = { s1: '260g', s2: '520g', s4: '1040g' };
const kraPaoWeights = { s1: '160g', s2: '320g', s4: '640g' };

for (let category of menuData) {
    if (!category.items) continue;
    
    // 1. Delete "ผัดเผ็ด"
    category.items = category.items.filter(item => {
        const nameTh = (item.th || '').toLowerCase();
        const nameEn = (item.en || '').toLowerCase();
        return !nameTh.includes('ผัดเผ็ด') && !nameEn.includes('pad phed');
    });
    
    // 2. Update Curries & Kra Pao
    for (let item of category.items) {
        const nameTh = (item.th || '').toLowerCase();
        const nameEn = (item.en || '').toLowerCase();
        
        let isCurry = nameTh.includes('แกง') || nameTh.includes('พะแนง') || nameTh.includes('เทโพ') || 
                      nameTh.includes('มัสมั่น') || nameTh.includes('เขียวหวาน') || nameTh.includes('ต้มยำ') || 
                      nameTh.includes('ต้มข่า') || nameEn.includes('curry') || nameEn.includes('tom yum') || 
                      nameEn.includes('tom kha');
                      
        let isKraPao = nameTh.includes('กะเพรา') || nameTh.includes('กระเพรา') || nameEn.includes('kra pao') || nameEn.includes('basil');
        
        if (isCurry) {
            let prices = null;
            if (nameTh.includes('กุ้ง') || nameEn.includes('prawn') || nameEn.includes('shrimp')) prices = curryPrices.prawn;
            else if (nameTh.includes('เนื้อ') || nameEn.includes('beef')) prices = curryPrices.beef;
            else if (nameTh.includes('หมู') || nameEn.includes('pork')) prices = curryPrices.pork;
            else if (nameTh.includes('ไก่') || nameEn.includes('chicken') || nameTh.includes('เป็ด') || nameEn.includes('duck')) prices = curryPrices.chicken; // default duck to chicken pricing
            else if (nameTh.includes('ผัก') || nameTh.includes('เต้าหู้') || nameEn.includes('veg') || nameEn.includes('tofu')) prices = curryPrices.veg;
            
            // If it's a fish curry (e.g., Sea bass), default to Prawn pricing as it's seafood
            else if (nameTh.includes('ปลา') || nameEn.includes('fish') || nameEn.includes('bass')) prices = curryPrices.prawn;
            else prices = curryPrices.chicken; // Fallback
            
            item.price_s1 = prices.s1;
            item.price_s2 = prices.s2;
            item.price_s4 = prices.s4;
            item.weight_s1 = curryWeights.s1;
            item.weight_s2 = curryWeights.s2;
            item.weight_s4 = curryWeights.s4;
        } else if (isKraPao) {
            item.price_s1 = kraPaoPrices.s1;
            item.price_s2 = kraPaoPrices.s2;
            item.price_s4 = kraPaoPrices.s4;
            item.weight_s1 = kraPaoWeights.s1;
            item.weight_s2 = kraPaoWeights.s2;
            item.weight_s4 = kraPaoWeights.s4;
        }
    }
}

fs.writeFileSync(menuFile, JSON.stringify(menuData, null, 4), 'utf8');
console.log('Updated buffet_menu.json');

// Now update menu.html
const htmlFiles = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const htmlFile of htmlFiles) {
    if (!fs.existsSync(htmlFile)) continue;
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    
    // Add IDs to weights if not present
    htmlContent = htmlContent.replace(/<span class="text-gray-400 text-sm ml-1">\(250g\)<\/span>/g, '<span id="modal-weight-1" class="text-gray-400 text-sm ml-1">(250g)</span>');
    htmlContent = htmlContent.replace(/<span class="text-gray-400 text-sm ml-1">\(500g\)<\/span>/g, '<span id="modal-weight-2" class="text-gray-400 text-sm ml-1">(500g)</span>');
    htmlContent = htmlContent.replace(/<span class="text-gray-400 text-sm ml-1">\(1kg\)<\/span>/g, '<span id="modal-weight-4" class="text-gray-400 text-sm ml-1">(1kg)</span>');
    
    // Update JS logic
    const oldPricesLogic = `
            // Prices & Add functions
            document.getElementById('modal-price-1').innerText = '£' + item.price.toFixed(2);
            document.getElementById('modal-price-2').innerText = '£' + (item.price * 1.7).toFixed(2);
            document.getElementById('modal-price-4').innerText = '£' + (item.price * 3.2).toFixed(2);
            
            document.getElementById('modal-add-1').onclick = () => { addBuffetItem(item.id + '_s1', item.en + ' (Serves 1)', item.price, imgSrc); closeProductModal(); };
            document.getElementById('modal-add-2').onclick = () => { addBuffetItem(item.id + '_s2', item.en + ' (Serves 2)', item.price * 1.7, imgSrc); closeProductModal(); };
            document.getElementById('modal-add-4').onclick = () => { addBuffetItem(item.id + '_s4', item.en + ' (Serves 4)', item.price * 3.2, imgSrc); closeProductModal(); };
`;
    const newPricesLogic = `
            // Prices & Weights & Add functions
            const p1 = item.price_s1 || item.price;
            const p2 = item.price_s2 || (item.price * 1.7);
            const p4 = item.price_s4 || (item.price * 3.2);
            
            const w1 = item.weight_s1 || '250g';
            const w2 = item.weight_s2 || '500g';
            const w4 = item.weight_s4 || '1kg';
            
            document.getElementById('modal-price-1').innerText = '£' + p1.toFixed(2);
            document.getElementById('modal-price-2').innerText = '£' + p2.toFixed(2);
            document.getElementById('modal-price-4').innerText = '£' + p4.toFixed(2);
            
            const w1El = document.getElementById('modal-weight-1');
            const w2El = document.getElementById('modal-weight-2');
            const w4El = document.getElementById('modal-weight-4');
            if(w1El) w1El.innerText = '(' + w1 + ')';
            if(w2El) w2El.innerText = '(' + w2 + ')';
            if(w4El) w4El.innerText = '(' + w4 + ')';
            
            document.getElementById('modal-add-1').onclick = () => { addBuffetItem(item.id + '_s1', item.en + ' (Serves 1)', p1, imgSrc); closeProductModal(); };
            document.getElementById('modal-add-2').onclick = () => { addBuffetItem(item.id + '_s2', item.en + ' (Serves 2)', p2, imgSrc); closeProductModal(); };
            document.getElementById('modal-add-4').onclick = () => { addBuffetItem(item.id + '_s4', item.en + ' (Serves 4)', p4, imgSrc); closeProductModal(); };
`;

    // Only replace if the old logic still exists in some form, or we can use regex
    // Since we injected it recently, we can try string replace
    if (htmlContent.includes("document.getElementById('modal-price-1').innerText = '£' + item.price.toFixed(2);")) {
        htmlContent = htmlContent.replace(/[\s]*\/\/ Prices & Add functions[\s\S]*?closeProductModal\(\);\s*};/m, newPricesLogic);
        fs.writeFileSync(htmlFile, htmlContent, 'utf8');
        console.log('Updated ' + htmlFile);
    } else {
        console.log('Prices logic not found in exactly that format in ' + htmlFile + ', attempting fallback regex replace.');
        const regex = /\/\/ Prices & Add functions[\s\S]*?closeProductModal\(\);\s*\};/;
        if (regex.test(htmlContent)) {
            htmlContent = htmlContent.replace(regex, newPricesLogic.trim());
            fs.writeFileSync(htmlFile, htmlContent, 'utf8');
            console.log('Updated via fallback regex in ' + htmlFile);
        }
    }
}
