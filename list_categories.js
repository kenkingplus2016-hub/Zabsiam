const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\KENDEE\\Desktop\\เว็บ\\data\\buffet_menu.json', 'utf8'));

if (Array.isArray(data)) {
    data.forEach((cat, i) => {
        let en = cat.en || (cat.name && cat.name.en) || (cat.category && typeof cat.category === 'string' ? cat.category : (cat.category && cat.category.en)) || cat.title || cat.id || "???";
        console.log(i, '|', typeof en === 'string' ? en : JSON.stringify(en));
        // Also check subcategories
        if (cat.items && Array.isArray(cat.items)) {
            // check if items have sub-items
        }
        if (cat.subcategories && Array.isArray(cat.subcategories)) {
            cat.subcategories.forEach((sub, j) => {
                let subEn = sub.en || (sub.name && sub.name.en) || sub.title || sub.id || "???";
                console.log('  ', j, '|', typeof subEn === 'string' ? subEn : JSON.stringify(subEn));
            });
        }
    });
} else {
    console.log('Top level keys:', Object.keys(data));
}
