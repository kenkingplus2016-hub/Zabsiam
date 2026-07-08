const fs = require('fs');
const path = require('path');

const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/booking.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the ReferenceError in the else block by defining qty and showing qty-section
const target1 = `            } else {
                currentTotalSets = 1; // Default 1 set for classic/authentic menus
                document.getElementById('info-set-name').textContent = \`\${info.name_th} / \${info.name_en}\`;
                document.getElementById('info-set-unit').textContent = \`สำหรับ \${info.unit_th} / For \${info.unit_en}\`;
                document.getElementById('info-set-price').textContent = \`£\${(info.price * qty).toFixed(0)}\`;
                if (info.category === 'Classic') {
                    document.getElementById('info-set-deposit').textContent = \`\${currentLang === 'th' ? 'ชำระเต็มจำนวน' : 'Full Payment'} = £\${info.price.toFixed(2)}\`;`;

const replacement1 = `            } else {
                currentTotalSets = 1; // Default 1 set for classic/authentic menus
                const qty = parseInt(document.getElementById('orderQty').value) || 1;
                document.getElementById('qty-section').style.display = 'block';
                document.getElementById('info-set-name').textContent = \`\${info.name_th} / \${info.name_en}\`;
                document.getElementById('info-set-unit').textContent = \`สำหรับ \${info.unit_th} / For \${info.unit_en}\`;
                document.getElementById('info-set-price').textContent = \`£\${(info.price * qty).toFixed(2)}\`;
                if (info.category === 'Classic') {
                    document.getElementById('info-set-deposit').textContent = \`\${currentLang === 'th' ? 'ชำระเต็มจำนวน' : 'Full Payment'} = £\${(info.price * qty).toFixed(2)}\`;`;

content = content.replace(target1, replacement1);

// 2. Hide qty-section in Royal Siam Gathering block
const target2 = `        if (info.category === 'Royal Siam Gathering') {`;
const replacement2 = `        if (info.category === 'Royal Siam Gathering') {
            document.getElementById('qty-section').style.display = 'none';`;
content = content.replace(target2, replacement2);

// 3. Hide qty-section when nothing is selected
const target3 = `        } else {
            infoBox.style.display = 'none';`;
const replacement3 = `        } else {
            document.getElementById('qty-section').style.display = 'none';
            infoBox.style.display = 'none';`;
content = content.replace(target3, replacement3);

// 4. Also fix the earlier faulty replace attempt that wasn't found
// No need to revert since it didn't match anything.

fs.writeFileSync(file, content);
console.log('Fixed qty display logic in booking.html');
