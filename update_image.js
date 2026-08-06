const fs = require('fs');

const dataFile = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const apiFiles = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api\\buffet',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api\\buffet'
];

let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// Find Green Curry Pork and update images
let updated = false;
data.forEach(category => {
    if (category.items) {
        category.items.forEach(item => {
            if (item.en && item.en.toLowerCase().includes('green curry pork')) {
                item.img = 'green_curry_pork_bowl.jpg';
                item.img_hover = 'green_curry_pork_pkg.jpg';
                updated = true;
            }
        });
    }
});

if (updated) {
    const jsonStr = JSON.stringify(data, null, 4);
    // write to source
    fs.writeFileSync(dataFile, jsonStr, 'utf8');
    
    // sync to api endpoints
    apiFiles.forEach(file => {
        if (fs.existsSync(file)) {
            fs.writeFileSync(file, jsonStr, 'utf8');
        }
    });
    console.log("Updated Green Curry Pork images successfully!");
} else {
    console.log("Could not find Green Curry Pork in the database.");
}
