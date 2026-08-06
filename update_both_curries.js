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
            if (item.en && item.en.toLowerCase().includes('green curry pork')) {
                item.img_hover = 'green_curry_pork_pkg.jpg';
                updated = true;
            }
            if (item.en && item.en.toLowerCase().includes('red curry with pork')) {
                item.img_hover = 'Red_curry_pork_pkg.jpg';
                updated = true;
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
    console.log("Images for Green Curry Pork and Red Curry with Pork have been updated!");
}
