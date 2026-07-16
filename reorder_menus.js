const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// The desired top 5 IDs in order
const top5Ids = [
    'lunch_box_set_a',
    'lunch_box_vip',
    18, // or '18'
    'lunch_box_signature',
    102 // or '102'
];

const top5Items = [];

// Find and extract the top 5 items
for (const id of top5Ids) {
    const index = data.findIndex(m => m.id === id || m.id === String(id));
    if (index !== -1) {
        top5Items.push(data.splice(index, 1)[0]);
    } else {
        console.log("Could not find menu with id:", id);
    }
}

// Unshift them back in reverse order so they end up in the correct forward order
for (let i = top5Items.length - 1; i >= 0; i--) {
    data.unshift(top5Items[i]);
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Reordered top 5 menus.");
