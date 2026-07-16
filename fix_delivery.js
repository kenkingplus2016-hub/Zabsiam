const fs = require('fs');
const path = require('path');

function fixDeliveryFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the block:
    // window.location.href = 'booking.html' + queryParams;
    // We want to replace it with:
    // let customChoicesArr = []; selects.forEach(sel => customChoicesArr.push(sel.value));
    // addToCart({ ... })
    
    // Actually it's easier to just do a precise regex replace
    const oldCodeStr = `                    if (!allSelected) {
                        alert(currentLang === 'th' ? 'กรุณาเลือกรายการอาหารให้ครบถ้วน / Please complete all selections' : 'Please complete all menu selections');
                        return;
                    }
                    window.location.href = 'booking.html' + queryParams;`;
                    
    const newCodeStr = `                    if (!allSelected) {
                        alert(currentLang === 'th' ? 'กรุณาเลือกรายการอาหารให้ครบถ้วน / Please complete all selections' : 'Please complete all menu selections');
                        return;
                    }
                    
                    let customChoicesArr = [];
                    selects.forEach(sel => {
                        customChoicesArr.push(sel.value);
                    });
                    
                    addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name.th || set.name_th,
                        name_en: set.name.en || set.name_en,
                        price: parseFloat(set.price),
                        qty: parseInt(qty),
                        category: 'Classic',
                        unit_th: set.unit?.th || 'ชุด',
                        unit_en: set.unit?.en || 'Set',
                        options: customChoicesArr
                    });
                    closeModal();`;

    content = content.replace(oldCodeStr, newCodeStr);
    
    fs.writeFileSync(filePath, content);
    console.log("Fixed: " + filePath);
}

fixDeliveryFile('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/delivery.html');
fixDeliveryFile('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html');
