const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const squidIndex = data.findIndex(m => m.id === 'lunch_box_squid_salted_egg');

if (squidIndex !== -1) {
    const menu = data[squidIndex];

    // Update Description
    menu.desc.th = "เซตข้าวกล่องซิกเนเจอร์: ปลาหมึกผัดไข่เค็ม เสิร์ฟพร้อมข้าวสวยร้อนๆ";
    menu.desc.en = "Signature Box: Stir-fried Squid with Salted Egg Yolk sauce. Served with your choice of rice.";

    // Remove Som Tum and Fried Egg from Items
    menu.items.th.starters = ["พริกน้ำปลา"];
    menu.items.en.starters = ["Prik Nam Pla"];
    
    // Remove somtum options
    menu.options = menu.options.filter(opt => opt.id !== 'somtum_type');

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Signature Box Squid Salted Egg.");
} else {
    console.log("Menu not found.");
}
