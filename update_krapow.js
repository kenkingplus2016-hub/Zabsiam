const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'data', 'classic_menu.json');
let menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

const krapowIndex = menuData.findIndex(item => item.id === 'lunch_box_krapow');

if (krapowIndex !== -1) {
    menuData[krapowIndex].name.en = "Lunch Box Set (Pad Krapow & Som Tum)";
    menuData[krapowIndex].name.th = "Lunch Box ผัดกะเพรา + ส้มตำ"; // Ensure Thai name is still correct
    menuData[krapowIndex].price = 16.95;
    
    fs.writeFileSync(menuPath, JSON.stringify(menuData, null, 4), 'utf8');
    console.log("Successfully updated Krapow & Som Tum Box!");
} else {
    console.log("Krapow Box not found.");
}
