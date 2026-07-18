const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let mainsCategory = data.find(c => c.id === 'mains');

if (mainsCategory) {
    let newItems = [];
    let items = mainsCategory.items;
    
    // We will build a new array by plucking items out in the desired order
    // Helper to find and extract items matching a prefix
    const extractItems = (prefix) => {
        const found = items.filter(i => i.th.startsWith(prefix));
        items = items.filter(i => !i.th.startsWith(prefix));
        return found;
    };
    
    // Groups to extract in order:
    // 1. แกงเขียวหวาน (Green Curry)
    newItems.push(...extractItems('แกงเขียวหวาน'));
    // 2. แกงแดง (Red Curry)
    newItems.push(...extractItems('แกงแดง'));
    // 3. แกงมัสมัน (Massaman)
    newItems.push(...extractItems('แกงมัสมัน'));
    // 4. แกงกะหรี่ (Thai Curry)
    newItems.push(...extractItems('แกงกะหรี่'));
    // 5. แกงพะแนง (Panang Curry)
    newItems.push(...extractItems('แกงพะแนง'));
    // 6. แกงเทโพ (Tae Po Curry)
    newItems.push(...extractItems('แกงเทโพ'));
    
    // Add the rest of the items back (seafood, stir fries, etc.)
    newItems.push(...items);
    
    mainsCategory.items = newItems;

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('Reordered the mains category successfully.');
} else {
    console.log('Could not find mains category.');
}
