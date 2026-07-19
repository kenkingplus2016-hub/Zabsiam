const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        // Ensure it's a curry (แกง) and not a soup (ต้ม)
        if (item.th.startsWith('แกง') || item.en.toLowerCase().includes('curry')) {
            // Check for prawn (กุ้ง)
            if (item.th.includes('กุ้ง') || item.en.toLowerCase().includes('prawn')) {
                item.price = 16;
                item.unit = '750 กรัม 6 ถ้วย';
                console.log(`Updated Prawn Curry: ${item.th} to £16 and 750 กรัม 6 ถ้วย`);
                updated++;
            }
            // Check for beef (เนื้อ)
            else if (item.th.includes('เนื้อ') || item.en.toLowerCase().includes('beef')) {
                item.price = 18;
                item.unit = '750 กรัม 6 ถ้วย';
                console.log(`Updated Beef Curry: ${item.th} to £18 and 750 กรัม 6 ถ้วย`);
                updated++;
            }
        }
    });
});

if (updated > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}
