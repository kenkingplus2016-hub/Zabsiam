const fs = require('fs');

const dataFile = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const apiFiles = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api\\buffet',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api\\buffet'
];

let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const imageMapping = {
    'red curry with beef': 'Red Curry beef pkg.jpg',
    'red curry with chicken': 'Red Curry  Chicken pkg.jpg',
    'panang curry with beef': 'Panang Curry beef pkg.jpg',
    'panang curry with chicken': 'Panang Curry Chicken pkg.jpg',
    'panang curry with pork': 'Panang Curry Pork pkg.jpg'
};

let updated = false;
data.forEach(category => {
    if (category.items) {
        category.items.forEach(item => {
            if (item.en) {
                const enLower = item.en.toLowerCase();
                for (const [key, img] of Object.entries(imageMapping)) {
                    if (enLower.includes(key)) {
                        item.img_hover = img;
                        updated = true;
                    }
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
    console.log("Updated img_hover for Red and Panang curries successfully!");
} else {
    console.log("No matching items found.");
}
