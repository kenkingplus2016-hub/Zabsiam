const fs = require('fs');

const jsonPath = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let mainsCategory = data.find(c => c.id === 'mains');
let vegCategory = data.find(c => c.id === 'vegetables');

if (mainsCategory && vegCategory) {
    const curryIdsToMove = [
        'item_owgurx3xq', // แกงแดงผักรวมเต้าหู้
        'item_geepwab97', // แกงเขียวหวานผักรวมเต้าหู้
        'item_lpl8y41uw', // แกงพะแนงผักรวมเต้าหู้
        'item_3clv38eoe'  // แกงเทโพผักรวมเต้าหู้
    ];

    const curries = vegCategory.items.filter(item => curryIdsToMove.includes(item.id));
    
    if (curries.length > 0) {
        // Remove from vegetables
        vegCategory.items = vegCategory.items.filter(item => !curryIdsToMove.includes(item.id));
        
        // Add to mains
        mainsCategory.items.push(...curries);

        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Moved ${curries.length} items to the 'mains' category.`);
    } else {
        console.log('No curries found in the vegetables category to move.');
    }
} else {
    console.log('Could not find mains or vegetables categories.');
}
