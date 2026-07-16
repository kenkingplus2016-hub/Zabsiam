const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const crabIndex = data.findIndex(m => m.id === 'lunch_box_crab_curry');

if (crabIndex !== -1) {
    const menu = data[crabIndex];

    // Update Description
    menu.desc.th = "เซตข้าวกล่องซิกเนเจอร์: ปูผัดผงกะหรี่ เสิร์ฟพร้อมข้าว";
    menu.desc.en = "Signature Box: Stir-fried Crab in creamy Yellow Curry Powder. Served with your choice of rice.";

    // Remove Som Tum and Fried Egg from Items
    menu.items.th.starters = ["พริกน้ำปลา"];
    menu.items.en.starters = ["Prik Nam Pla"];
    
    // Remove somtum options
    menu.options = menu.options.filter(opt => opt.id !== 'somtum_type');

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Signature Box Crab Curry.");
} else {
    console.log("Menu not found.");
}
