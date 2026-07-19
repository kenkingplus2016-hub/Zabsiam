const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const updates = [
    { keywords: ['ผัดผักรวมน้ำมันหอย', 'ผัดผักรวม', 'mixed vegetable'], price: 12, unit: 'จาน' },
    { keywords: ['ผัดผักฉ่อย', 'bok choy', 'pak choi'], price: 12, unit: 'จาน' },
    { keywords: ['หน่อไม้ฝรั่งผัด', 'asparagus'], price: 12, unit: 'จาน' },
    { keywords: ['ผัดเนื้อผักรวม', 'ผัดผักรวมเนื้อ', 'beef with mixed'], price: 18, unit: 'จาน' },
    { keywords: ['ผัดผักรวมกุ้ง', 'prawn with mixed', 'ผัดผักรวมกุ้งน้ำมันหอย'], price: 16, unit: 'จาน' }
];

data.forEach(category => {
    category.items.forEach(item => {
        // Special case to prevent overlap (e.g. "ผัดผักรวม" matching "ผัดผักรวมกุ้ง")
        if (item.th.includes('กุ้ง') || item.en.toLowerCase().includes('prawn')) {
            if (item.th.includes('ผักรวม') || item.en.toLowerCase().includes('mixed veg')) {
                item.price = 16;
                item.unit = 'จาน';
                console.log(`Updated ${item.th} to £16 and unit to จาน`);
                updated++;
            }
        } 
        else if (item.th.includes('เนื้อ') || item.en.toLowerCase().includes('beef')) {
             if (item.th.includes('ผักรวม') || item.en.toLowerCase().includes('mixed veg')) {
                item.price = 18;
                item.unit = 'จาน';
                console.log(`Updated ${item.th} to £18 and unit to จาน`);
                updated++;
             }
        }
        else if (item.th.includes('ผักฉ่อย') || item.en.toLowerCase().includes('pak choi') || item.en.toLowerCase().includes('bok choy')) {
            item.price = 12;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £12 and unit to จาน`);
            updated++;
        }
        else if (item.th.includes('หน่อไม้ฝรั่ง') || item.en.toLowerCase().includes('asparagus')) {
            item.price = 12;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £12 and unit to จาน`);
            updated++;
        }
        else if (item.th.includes('ผัดผักรวม') || item.en.toLowerCase().includes('mixed veg')) {
            // This is the plain mixed veg (not prawn, not beef)
            item.price = 12;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £12 and unit to จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}
