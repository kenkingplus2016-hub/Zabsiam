const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';

function updateModals(filename) {
    let file = path.join(dir, filename);
    let content = fs.readFileSync(file, 'utf8');

    // 1. Inject UI
    if (!content.includes('id="modal-qty-section"')) {
        const uiHtml = `
            <!-- Quantity Selector -->
            <div id="modal-qty-section" style="margin-top:20px; text-align:center;">
                <h4 style="color:var(--dark-green); margin:0 0 10px 0; font-size:1rem;"><span class="nav-th">จำนวน / Quantity</span><span class="nav-en">Quantity</span></h4>
                <div style="display:inline-flex; align-items:center; border:2px solid var(--gold); border-radius:25px; overflow:hidden; background:#fff;">
                    <button type="button" onclick="decreaseModalQty()" style="border:none; background:var(--cream); color:var(--dark-green); width:40px; height:40px; font-weight:bold; font-size:1.2rem; cursor:pointer;">-</button>
                    <input type="text" id="modal-qty-input" value="1" readonly style="width:50px; text-align:center; border:none; font-weight:bold; font-size:1.1rem; color:var(--dark-green); pointer-events:none;">
                    <button type="button" onclick="increaseModalQty()" style="border:none; background:var(--cream); color:var(--dark-green); width:40px; height:40px; font-weight:bold; font-size:1.2rem; cursor:pointer;">+</button>
                </div>
            </div>`;
        content = content.replace('<!-- Book Button inside Modal -->', uiHtml + '\n            <!-- Book Button inside Modal -->');
    }

    // 2. Inject JS functions
    if (!content.includes('function increaseModalQty')) {
        const jsFuncs = `
    function increaseModalQty() {
        const input = document.getElementById('modal-qty-input');
        input.value = parseInt(input.value) + 1;
    }
    function decreaseModalQty() {
        const input = document.getElementById('modal-qty-input');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
        }
    }
`;
        content = content.replace('function closeModal() {', jsFuncs + '\n    function closeModal() {');
    }

    // 3. Reset qty on openModal
    if (!content.includes("document.getElementById('modal-qty-input').value = 1;")) {
        content = content.replace("document.getElementById('modal-img').src =", "document.getElementById('modal-qty-input').value = 1;\n            document.getElementById('modal-img').src =");
    }

    // 4. Update onclick logic
    const oldOptionsOnclick = `let queryParams = \`?set=classic-\${set.id}\`;`;
    if (content.includes(oldOptionsOnclick)) {
        content = content.replace(oldOptionsOnclick, `const qty = document.getElementById('modal-qty-input').value || 1;\n                    let queryParams = \`?set=classic-\${set.id}&qty=\${qty}\`;`);
    }

    const oldNoOptionsOnclick = `modalBookBtn.onclick = null;\n                modalBookBtn.href = \`booking.html?set=classic-\${set.id}\`;`;
    const oldNoOptionsOnclick2 = `modalBookBtn.onclick = null;\r\n                modalBookBtn.href = \`booking.html?set=classic-\${set.id}\`;`;
    const newNoOptionsOnclick = `modalBookBtn.href = '#';
                modalBookBtn.onclick = function(e) {
                    e.preventDefault();
                    const qty = document.getElementById('modal-qty-input').value || 1;
                    window.location.href = \`booking.html?set=classic-\${set.id}&qty=\${qty}\`;
                };`;
    
    if (content.includes(oldNoOptionsOnclick)) {
        content = content.replace(oldNoOptionsOnclick, newNoOptionsOnclick);
    } else if (content.includes(oldNoOptionsOnclick2)) {
        content = content.replace(oldNoOptionsOnclick2, newNoOptionsOnclick);
    }

    fs.writeFileSync(file, content);
    console.log('Updated ' + filename);
}

function updateBooking() {
    let file = path.join(dir, 'booking.html');
    let content = fs.readFileSync(file, 'utf8');

    // 1. Inject UI for Quantity (after menuSetSelect)
    if (!content.includes('id="orderQty"')) {
        const qtyHtml = `
            <div id="qty-section" style="margin-bottom:15px; display:none;">
                <label id="l-qty" style="color:var(--dark-green); font-weight:600; display:block; margin-bottom:5px;">จำนวน / Quantity</label>
                <div style="display:flex; align-items:center; border:2px solid var(--gold); border-radius:12px; overflow:hidden; background:#fff; width:fit-content;">
                    <button type="button" onclick="document.getElementById('orderQty').stepDown(); updateSetInfo();" style="border:none; background:var(--cream); color:var(--dark-green); width:45px; height:45px; font-weight:bold; font-size:1.2rem; cursor:pointer;">-</button>
                    <input type="number" id="orderQty" min="1" value="1" required style="width:60px; text-align:center; border:none; font-weight:bold; font-size:1.1rem; color:var(--dark-green);" onchange="updateSetInfo()">
                    <button type="button" onclick="document.getElementById('orderQty').stepUp(); updateSetInfo();" style="border:none; background:var(--cream); color:var(--dark-green); width:45px; height:45px; font-weight:bold; font-size:1.2rem; cursor:pointer;">+</button>
                </div>
            </div>`;
        content = content.replace('id="selected-set-info"', 'id="selected-set-info"');
        content = content.replace('</select>', '</select>\n' + qtyHtml);
    }

    // 2. Parse qty from URL
    if (!content.includes("const urlQty = urlParams.get('qty')")) {
        const paramParser = `const urlQty = urlParams.get('qty');\n            if (urlQty) document.getElementById('orderQty').value = urlQty;`;
        content = content.replace("const preselected = urlParams.get('set');", "const preselected = urlParams.get('set');\n            " + paramParser);
    }

    // 3. Update updateSetInfo to multiply by qty
    if (!content.includes('const qty = parseInt(document.getElementById(\'orderQty\').value) || 1;')) {
        const qtyCalc = `const qty = parseInt(document.getElementById('orderQty').value) || 1;
                document.getElementById('qty-section').style.display = 'block';`;
        content = content.replace("document.getElementById('selected-set-info').style.display = 'block';", "document.getElementById('selected-set-info').style.display = 'block';\n                " + qtyCalc);
        
        content = content.replace("`£${info.price.toFixed(0)}`;", "`£${(info.price * qty).toFixed(0)}`;");
        content = content.replace("`£${info.price.toFixed(2)}`;", "`£${(info.price * qty).toFixed(2)}`;");
        content = content.replace("`มัดจำ 50% = £${(info.price / 2).toFixed(2)}`;", "`มัดจำ 50% = £${((info.price * qty) / 2).toFixed(2)}`;");
    }

    // 4. Update submitBooking to include qty
    if (!content.includes("const qty = document.getElementById('orderQty').value;")) {
        const qtyVar = `const qty = document.getElementById('orderQty').value;
            const totalPrice = info.price * qty;`;
        content = content.replace("const info = allMenuSets.find(s => s.key === setKey);", "const info = allMenuSets.find(s => s.key === setKey);\n            " + qtyVar);
        
        content = content.replace("`📦 Set: ${info.name_th} (${info.name_en})\\n`", "`📦 Set: ${info.name_th} (${info.name_en})\\n🔢 Quantity: ${qty}\\n`");
        content = content.replace("`💰 Total Price: £${info.price.toFixed(2)}\\n`", "`💰 Total Price: £${totalPrice.toFixed(2)}\\n`");
        
        // Fix deposit text replacement
        content = content.replace("`💳 Deposit (50%): £${(info.price / 2).toFixed(2)}\\n`", "`💳 Deposit (50%): £${(totalPrice / 2).toFixed(2)}\\n`");
        content = content.replace("`💳 Full Payment: £${info.price.toFixed(2)}\\n`", "`💳 Full Payment: £${totalPrice.toFixed(2)}\\n`");
    }

    fs.writeFileSync(file, content);
    console.log('Updated booking.html');
}

updateModals('delivery.html');
updateModals('desserts.html');
updateBooking();
