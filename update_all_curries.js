const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;
let duckCurryAdded = false;

data.forEach(category => {
    category.items.forEach(item => {
        // Find curry-like items
        if (item.th.includes('แกง') || item.th.includes('พะแนง') || item.th.includes('มัสมั่น') || item.th.includes('ต้มยำ') || item.th.includes('ต้มข่า')) {
            if (item.th.includes('หมู') || item.th.includes('ไก่')) {
                item.price = 40;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £40`);
                updated++;
            } else if (item.th.includes('กุ้ง') || item.th.includes('เนื้อ') || item.th.includes('ทะเล')) {
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £45`);
                updated++;
            } else if (item.th.includes('เต้าหู้') || item.th.includes('ผัก')) {
                item.price = 35;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £35`);
                updated++;
            }
            
            if (item.th.includes('แกงเผ็ดเป็ดย่าง')) {
                duckCurryAdded = true;
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated existing แกงเผ็ดเป็ดย่าง to £45`);
                updated++;
            }
        }
    });
});

// Add duck curry if not exists
if (!duckCurryAdded) {
    const mainsCat = data.find(c => c.id === 'mains');
    if (mainsCat) {
        mainsCat.items.push({
            id: 'item_duckcurry_' + Date.now(),
            th: "แกงเผ็ดเป็ดย่าง",
            en: "Roasted Duck Red Curry",
            img: "d4df9605-e117-4cd1-9c6a-ff5536551b9d.jpg",
            price: 45,
            unit: "3000 กรัม/หม้อ"
        });
        console.log(`Added แกงเผ็ดเป็ดย่าง to mains.`);
        updated++;
    }
}

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated/added items.`);
} else {
    console.log('No items modified.');
}
