const fs = require('fs');
const path = require('path');

const publicDir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

function updateProductPage(filename) {
    let file = path.join(publicDir, filename);
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Update No Options
    const oldNoOptionsOnclick = `modalBookBtn.href = '#';
                modalBookBtn.onclick = function(e) {
                    e.preventDefault();
                    const qty = document.getElementById('modal-qty-input').value || 1;
                    window.location.href = \`booking.html?set=classic-\${set.id}&qty=\${qty}\`;
                };`;
    const newNoOptionsOnclick = `modalBookBtn.href = '#';
                modalBookBtn.onclick = function(e) {
                    e.preventDefault();
                    const qty = parseInt(document.getElementById('modal-qty-input').value) || 1;
                    addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name_th,
                        name_en: set.name_en,
                        price: set.price,
                        qty: qty,
                        category: "Classic",
                        unit_th: set.unit_th || "กล่อง",
                        unit_en: set.unit_en || "Box"
                    });
                    closeModal();
                };`;
    
    if (content.includes(oldNoOptionsOnclick)) {
        content = content.replace(oldNoOptionsOnclick, newNoOptionsOnclick);
    }

    // Update With Options
    const oldWithOptionsEnd = `if (!allSelected) {
                        alert(currentLang === 'th' ? 'กรุณาเลือกรายการอาหารให้ครบ / Please complete all selections' : 'Please complete all menu selections');
                        return;
                    }
                    window.location.href = \`booking.html\${queryParams}\`;`;
    const newWithOptionsEnd = `if (!allSelected) {
                        alert(currentLang === 'th' ? 'กรุณาเลือกรายการอาหารให้ครบ / Please complete all selections' : 'Please complete all menu selections');
                        return;
                    }
                    addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name_th,
                        name_en: set.name_en,
                        price: set.price,
                        qty: parseInt(qty),
                        category: "Classic",
                        unit_th: set.unit_th || "กล่อง",
                        unit_en: set.unit_en || "Box",
                        options: customOptions
                    });
                    closeModal();`;
    
    // First, modify the options collection logic to build an array
    const oldOptionLoop = `selects.forEach(sel => {
                        if (!sel.value) {
                            allSelected = false;
                        } else {
                            queryParams += \`&custom_\${sel.getAttribute('data-id')}=\${encodeURIComponent(sel.value)}\`;
                        }
                    });`;
    const newOptionLoop = `let customOptions = [];
                    selects.forEach(sel => {
                        if (!sel.value) {
                            allSelected = false;
                        } else {
                            customOptions.push(sel.value);
                        }
                    });`;
    
    if (content.includes(oldOptionLoop) && content.includes(oldWithOptionsEnd)) {
        content = content.replace(oldOptionLoop, newOptionLoop);
        content = content.replace(oldWithOptionsEnd, newWithOptionsEnd);
    }

    // Change button text from Book Now to Add to Cart
    content = content.replace('<span id="modal-book-text">จองเลย / Book This Set</span>', '<span id="modal-book-text">เพิ่มลงตะกร้า / Add to Cart</span>');

    fs.writeFileSync(file, content);
    console.log('Updated cart logic in ' + filename);
}

updateProductPage('delivery.html');
updateProductPage('desserts.html');
