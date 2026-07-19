const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const cupDesserts = [
    'ลอดช่องสิงคโปร์',
    'ทับทิมกรอบ',
    'บวชชีกล้วย',
    'ขนมครองแครง',
    'บัวลอยสาคู',
    'บัวลอย 5 สี',
    'ลอดช่องอัญชัน',
    'ไอศกรีม'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวเหนียวมะม่วงน้ำดอกไม้') || item.en.toLowerCase().includes('mango sticky rice')) {
            item.price = 9.95;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £9.95 / จาน`);
            updated++;
        } else if (cupDesserts.some(name => item.th.includes(name))) {
            item.price = 7.95;
            item.unit = 'ถ้วย';
            console.log(`Updated ${item.th} to £7.95 / ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}
