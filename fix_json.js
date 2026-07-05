const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data/classic_menu.json', 'utf8'));
data.forEach(item => {
    if (item.name.en.includes('Siam Pruksa Box Set:')) {
        item.name.en = item.name.en.replace('Siam Pruksa Box Set:', 'Special Box');
        item.name.th = item.name.th.replace('สยามพฤกษา:', 'Special Box');
    } else if (item.name.en.includes('Siam Authentic:')) {
        item.name.en = item.name.en.replace('Siam Authentic:', 'Special Box');
        item.name.th = item.name.th.replace('สยามต้นตำรับ:', 'Special Box');
    }
});
fs.writeFileSync('./data/classic_menu.json', JSON.stringify(data, null, 2), 'utf8');
