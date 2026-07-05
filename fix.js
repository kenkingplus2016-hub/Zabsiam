const fs = require('fs');

// 1. Fix classic_menu.json
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

// 2. Fix delivery.html
let html = fs.readFileSync('./public/delivery.html', 'utf8');

// Fix filter on line 259
html = html.replace(/classicSets = allSets\.filter\(s => s\.name\.en\.includes\('Family'\).*?\);/, "classicSets = allSets.filter(s => s.name.en.includes('Family') || s.name.en.includes('Lunch Box') || s.name.en.includes('Special Box'));");

// Fix routing logic around line 322
html = html.replace(/if \(set\.name\.en\.includes\('Siam Pruksa'\).*?\{[\s\S]*?\} else \{[\s\S]*?\}/, if (set.name.en.match(/Set [A-F]/)) {
                menuHtml += cardHtml;
            } else {
                pruksaHtml += cardHtml;
            });

fs.writeFileSync('./public/delivery.html', html, 'utf8');
