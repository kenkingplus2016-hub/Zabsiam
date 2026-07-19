const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

const namprik = [
    'น้ำพริกอ่อง',
    'น้ำพริกหนุ่ม',
    'น้ำพริกกะปิ'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (namprik.some(name => item.th.includes(name))) {
            item.unit = 'ชุด';
            console.log(`Updated unit for ${item.th} (${item.en}) to ชุด (Set)`);
            updated++;
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find those chili dips in the menu.');
}
