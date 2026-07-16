const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const setAIndex = data.findIndex(m => m.id === 'lunch_box_set_a');

if (setAIndex !== -1) {
    const setA = data[setAIndex];

    // Update Krapow meat options
    const krapowOption = setA.options.find(o => o.id === 'krapow_meat');
    if (krapowOption) {
        krapowOption.choices.push(
            { "th": "ปลาหมึก (+£1)", "en": "Squid (+£1)", "extra": 1 },
            { "th": "หมูกรอบ (+£1)", "en": "Crispy Pork Belly (+£1)", "extra": 1 }
        );
    }

    // Update Curry type options
    const curryOption = setA.options.find(o => o.id === 'curry_type');
    if (curryOption) {
        curryOption.choices.push(
            { "th": "แกงมัสมั่น", "en": "Massaman Curry" },
            { "th": "แกงกะหรี่", "en": "Yellow Curry" }
        );
    }
    
    // Update TH description to reflect the changes slightly if needed
    // "ข้าวกะเพรา (หมูสับ/ไก่สับ/เนื้อสับ)" -> "ข้าวกะเพรา (เลือกเนื้อสัตว์ได้)"
    setA.items.th.mains[0] = "ข้าวกะเพรา (เลือกเนื้อสัตว์ได้) + ไข่ดาว";
    setA.items.en.mains[0] = "Pad Krapow (Choose Meat) with Rice & Fried Egg";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Lunch Box Set A options.");
} else {
    console.log("Menu not found.");
}
