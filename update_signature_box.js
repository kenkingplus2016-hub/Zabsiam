const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const index = data.findIndex(m => m.id === 'lunch_box_signature');

if (index !== -1) {
    const menu = data[index];

    // Update Name
    menu.name.th = "Signature Grilled Meat Box Set";
    menu.name.en = "Signature Grilled Meat Box Set";

    // Update Description
    menu.desc.th = "เซตซิกเนเจอร์: คอหมูย่าง หรือ เสือร้องไห้ (เนื้อย่างเตาถ่าน) น้ำจิ้มแจ่วรสเด็ด ส้มตำไทย หรือ ส้มตำปูปลาร้า และข้าวเหนียว";
    menu.desc.en = "Signature Set: Grilled Pork Neck or Crying Tiger Beef (Charcoal Grilled Meat), Spicy Jaew Sauce, Som Tum Thai or Som Tum Pu Pla Ra, and Sticky Rice";

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Signature Box name and desc.");
} else {
    console.log("Menu not found.");
}
