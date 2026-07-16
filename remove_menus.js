const fs = require('fs');

// 1. Remove Pinto 14
const royalFile = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
let royalData = JSON.parse(fs.readFileSync(royalFile, 'utf8'));
const initialRoyalLength = royalData.length;
royalData = royalData.filter(m => String(m.id) !== '14');
if (royalData.length < initialRoyalLength) {
    fs.writeFileSync(royalFile, JSON.stringify(royalData, null, 2), 'utf8');
    console.log("Removed Pinto 14 from royal_menu.json.");
} else {
    console.log("Pinto 14 not found in royal_menu.json.");
}

// 2. Remove Special Box Set VIP
const classicFile = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
let classicData = JSON.parse(fs.readFileSync(classicFile, 'utf8'));
const initialClassicLength = classicData.length;
classicData = classicData.filter(m => m.id !== 'lunch_box_vip');
if (classicData.length < initialClassicLength) {
    fs.writeFileSync(classicFile, JSON.stringify(classicData, null, 2), 'utf8');
    console.log("Removed Special Box Set VIP from classic_menu.json.");
} else {
    console.log("Special Box Set VIP not found in classic_menu.json.");
}
