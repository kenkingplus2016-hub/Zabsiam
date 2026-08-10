const fs = require('fs');

const dataFile = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const apiFiles = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api\\buffet',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api\\buffet'
];

let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

let updated = false;
data.forEach(category => {
    if (category.items) {
        category.items.forEach(item => {
            if (item.en) {
                if (item.en.includes('Red Curry with ')) {
                    item.en = item.en.replace('Red Curry with ', 'Red Curry ');
                    updated = true;
                }
                if (item.en.includes('Panang Curry with ')) {
                    item.en = item.en.replace('Panang Curry with ', 'Panang Curry ');
                    updated = true;
                }
            }
        });
    }
});

if (updated) {
    const jsonStr = JSON.stringify(data, null, 4);
    fs.writeFileSync(dataFile, jsonStr, 'utf8');
    apiFiles.forEach(file => {
        if (fs.existsSync(file)) {
            fs.writeFileSync(file, jsonStr, 'utf8');
        }
    });
    console.log("Renamed Red Curry and Panang Curry items successfully!");
} else {
    console.log("No items found to rename.");
}
