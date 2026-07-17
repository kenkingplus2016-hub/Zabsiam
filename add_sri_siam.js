const fs = require('fs');

const menuPath = 'data/menu.json';
const data = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

// 1. Prepare new choices to add to all sets
const newChoices = [
    { th: "กุ้งห่มสไบ", en: "Goong Hom Sabai (Shrimp in Blanket)" },
    { th: "ทอดมันกุ้ง", en: "Tod Mun Goong (Deep Fried Shrimp Cakes)" },
    { th: "ต้มข่าไก่", en: "Tom Kha Gai (Coconut Galangal Soup)" },
    { th: "ต้มข่ากุ้ง (+£3)", en: "Tom Kha Goong (+£3)", extra: 3 },
    { th: "ต้มยำกุ้ง", en: "Tom Yum Goong (Spicy Shrimp Soup)" },
    { th: "แกงส้มแป๊ะซะปลากระพง", en: "Gaeng Som Pae Sa Sea Bass" },
    { th: "ปลากระพงนึ่งมะนาว", en: "Steamed Sea Bass with Lime and Garlic" },
    { th: "ปลาหมึกนึ่งมะนาว", en: "Steamed Squid with Lime and Garlic" },
    { th: "กุ้งแม่น้ำย่าง", en: "Grilled River Prawns" },
    { th: "ข้าวผัดมันกุ้ง", en: "Shrimp Paste Fried Rice" },
    { th: "ข้าวผัดต้มยำกุ้ง", en: "Tom Yum Goong Fried Rice" },
    { th: "น้ำพริกกะปิ", en: "Nam Prik Kapi (Shrimp Paste Chili Dip)" },
    { th: "น้ำพริกหนุ่ม", en: "Nam Prik Noom (Northern Green Chili Dip)" },
    { th: "น้ำพริกอ่อง", en: "Nam Prik Ong (Northern Tomato Pork Chili Dip)" },
    { th: "ขนมเปียกปูน", en: "Khanom Piak Poon (Pandan Sweet Pudding)" },
    { th: "ขนมตะโก้", en: "Khanom Tako (Thai Pudding with Coconut Topping)" },
    { th: "ไอศกรีมกะทิข้าวเหนียว", en: "Coconut Ice Cream with Sticky Rice" },
    { th: "ไอศกรีมมะม่วงข้าวเหนียวมูน", en: "Mango Ice Cream with Sticky Rice" }
];

// Combine all existing choices with the new choices (avoiding exact duplicates based on 'th' name)
let existingChoices = data[0].options[0].choices || [];
newChoices.forEach(nc => {
    if (!existingChoices.find(c => c.th === nc.th)) {
        existingChoices.push(nc);
    }
});

// Update choices for all sets (1 to 6)
data.forEach(set => {
    set.options.forEach(opt => {
        opt.choices = existingChoices;
    });
});

// 2. Create Set 7: Sri Siam
const sriSiamItems = [
    {
        type: { th: "ไฮไลท์", en: "Highlight" },
        th: "เซตศรีสยาม (Sri Siam Set)",
        en: "Experience the grand culinary heritage with our premium Sri Siam set.",
        img: "logo.png"
    },
    {
        type: { th: "อาหารว่าง", en: "Appetizer" },
        th: "กุ้งห่มสไบ หรือ ทอดมันกุ้ง",
        en: "Goong Hom Sabai or Tod Mun Goong",
        img: "logo.png"
    },
    {
        type: { th: "ซุป", en: "Soup" },
        th: "ต้มข่า",
        en: "Tom Kha",
        img: "logo.png"
    },
    {
        type: { th: "ซุป 2", en: "Soup 2" },
        th: "ต้มยำกุ้ง",
        en: "Tom Yum Goong",
        img: "logo.png"
    },
    {
        type: { th: "จานหลัก (ปลา)", en: "Main (Fish)" },
        th: "แกงส้มแป๊ะซะปลากระพง",
        en: "Gaeng Som Pae Sa Sea Bass",
        img: "logo.png"
    },
    {
        type: { th: "จานหลัก (ปลา 2)", en: "Main (Fish 2)" },
        th: "ปลากระพงนึ่งมะนาว",
        en: "Steamed Sea Bass with Lime",
        img: "logo.png"
    },
    {
        type: { th: "จานหลัก (ปลาหมึก)", en: "Main (Squid)" },
        th: "ปลาหมึกนึ่งมะนาว",
        en: "Steamed Squid with Lime",
        img: "logo.png"
    },
    {
        type: { th: "จานหลัก (กุ้ง)", en: "Main (Prawn)" },
        th: "กุ้งแม่น้ำย่าง",
        en: "Grilled River Prawns",
        img: "logo.png"
    },
    {
        type: { th: "ข้าวผัด", en: "Fried Rice" },
        th: "ข้าวผัดมันกุ้ง หรือ ข้าวผัดต้มยำกุ้ง",
        en: "Shrimp Paste or Tom Yum Fried Rice",
        img: "logo.png"
    },
    {
        type: { th: "น้ำพริก", en: "Chili Dip" },
        th: "น้ำพริกกะปิ/หนุ่ม/อ่อง",
        en: "Nam Prik Kapi, Noom or Ong",
        img: "logo.png"
    },
    {
        type: { th: "ของหวาน", en: "Dessert" },
        th: "ขนมหม้อแกง/ต้ม/เปียกปูน/ตะโก้",
        en: "Assorted Thai Traditional Sweets",
        img: "logo.png"
    },
    {
        type: { th: "ของหวาน 2", en: "Dessert 2" },
        th: "ไอศกรีมกะทิ หรือ ไอศกรีมมะม่วง",
        en: "Coconut or Mango Ice Cream",
        img: "logo.png"
    }
];

const sriSiamOptions = [];
for (let i = 1; i <= 11; i++) {
    sriSiamOptions.push({
        id: `dish_${i}`,
        label: { th: `เลือกเมนูที่ ${i}`, en: `Select Dish ${i}` },
        choices: existingChoices
    });
}

const newSet = {
    id: 7,
    name: {
        th: "ศรีสยาม",
        en: "Sri Siam"
    },
    price: "189", // Placeholder price, user can update or tell us
    desc: {
        th: "เซตศรีสยาม สุดยอดความพรีเมียม จัดเต็มทั้งกุ้งแม่น้ำและปลากระพง",
        en: "Sri Siam Set. The ultimate premium selection featuring River Prawns and Sea Bass."
    },
    items: sriSiamItems,
    options: sriSiamOptions
};

// Check if set 7 already exists to avoid duplication
const existingIndex = data.findIndex(s => s.id === 7);
if (existingIndex !== -1) {
    data[existingIndex] = newSet;
} else {
    data.push(newSet);
}

fs.writeFileSync(menuPath, JSON.stringify(data, null, 4), 'utf8');
console.log("Added Sri Siam set to menu.json successfully.");
