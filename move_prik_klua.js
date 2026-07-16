const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// The two menus in question
const krapowId = 'lunch_box_krapow';
const prikKluaId = 'lunch_box_prik_klua';

const prikKluaIndex = data.findIndex(m => m.id === prikKluaId);
const krapowIndex = data.findIndex(m => m.id === krapowId);

if (prikKluaIndex !== -1 && krapowIndex !== -1) {
    // Remove prik_klua from its current position
    const [prikKluaItem] = data.splice(prikKluaIndex, 1);
    
    // Find the new index of krapow since the array might have shifted
    const newKrapowIndex = data.findIndex(m => m.id === krapowId);
    
    // Insert prik_klua right after krapow
    data.splice(newKrapowIndex + 1, 0, prikKluaItem);

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Moved Prik Klua menu to be right after Krapow menu.");
} else {
    console.log(`Menus not found! Krapow: ${krapowIndex}, Prik Klua: ${prikKluaIndex}`);
}
