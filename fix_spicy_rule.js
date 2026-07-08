const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const files = ['booking.html', 'delivery.html', 'desserts.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // First, remove any existing rule I might have added for mango sticky rice
    content = content.replace(/[\t ]*\/\/ Do not add spiciness level to dessert items\r?\n[\t ]*if \(set\.id === 'lunch_box_mango_sticky_rice'\) \{\r?\n[\t ]*return set\.options;\r?\n[\t ]*\}/g, '');

    // Now, insert the new unified standard rule right after the some(spicy) check
    const anchor = `if (set.options.some(o => o.id.includes('spicy'))) {\r
            return set.options;\r
        }`;
    const anchor2 = `if (set.options.some(o => o.id.includes('spicy'))) {\n            return set.options;\n        }`;
    
    const rule = `
        // Standard rule: Do not add spiciness level to dessert and snack items
        const sid = String(set.id).toLowerCase();
        if (sid === 'lunch_box_mango_sticky_rice' || sid.includes('dessert') || sid.includes('snack')) {
            return set.options;
        }`;

    if (content.includes(anchor)) {
        content = content.replace(anchor, anchor + rule);
    } else if (content.includes(anchor2)) {
        content = content.replace(anchor2, anchor2 + rule);
    } else {
        console.log("Could not find anchor in " + file);
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log('Fixed spicy rule in ' + file);
});
