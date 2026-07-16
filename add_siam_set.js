const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const destDir = 'public/images';

// Map of artifacts to nice filenames
const imageMap = {
    'sai_ua_1784237864635.png': 'sai_ua.png',
    'isan_sausage_1784237879618.png': 'isan_sausage.png',
    'thung_thong_1784237887695.png': 'thung_thong.png',
    'pineapple_rice_1784237897496.png': 'pineapple_rice.png',
    'tamarind_shrimp_1784237907525.png': 'tamarind_shrimp.png',
    'seabass_fishsauce_1784237923390.png': 'seabass_fishsauce.png',
    'seabass_3flavor_1784237930335.png': 'seabass_3flavor.png',
    'khanom_chan_pea_1784237937319.png': 'khanom_chan_pea.png',
    'siam_lert_ros_1784237944954.png': 'siam_lert_ros.png',
    'pad_thai_premium_1784237958937.png': 'pad_thai_premium.png',
    'krong_krang_pea_1784237965879.png': 'krong_krang_pea.png'
};

for (const [src, dest] of Object.entries(imageMap)) {
    try {
        fs.copyFileSync(path.join(srcDir, src), path.join(destDir, dest));
    } catch(e) {
        console.error("Could not copy " + src);
    }
}

const dataFile = 'data/menu.json';
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// The new items to add to the master choices list
const newDessertChoices = [
    { th: "ขนมชั้นอัญชัน", en: "Butterfly Pea Layer Sweet" },
    { th: "ขนมครองแครงอัญชันมะพร้าวอ่อน", en: "Krong Krang Butterfly Pea with Young Coconut" },
    { th: "บัวลอยสาคู", en: "Bua Loy Sago" },
    { th: "บัวลอย 5 สี", en: "5-Color Bua Loy" },
    { th: "ลอดช่องอัญชันใบเตย", en: "Lod Chong Butterfly Pea & Pandan" },
    { th: "ทับทิมกรอบ", en: "Tub Tim Krob" },
    { th: "ขนมต้มไทยโบราณ", en: "Traditional Thai Coconut Dumplings" },
    { th: "ขนมชั้นใบเตย", en: "Pandan Layer Sweet" },
    { th: "วุ้นกะทิใบเตย", en: "Pandan Coconut Jelly" },
    { th: "วุ้นกะทิอัญชันมะพร้าวอ่อน", en: "Butterfly Pea Coconut Jelly" },
    { th: "ขนมหม้อแกง", en: "Khanom Mo Kaeng" },
    // Also add the new mains to the master list if they aren't there
    { th: "ไส้อั่ว", en: "Sai Ua (Northern Thai Sausage)" },
    { th: "ไส้กรอกอีสาน", en: "Isan Sausage" },
    { th: "ถุงทอง", en: "Thung Thong (Golden Bags)" },
    { th: "ข้าวผัดสับปะรด", en: "Pineapple Fried Rice" },
    { th: "ผัดไทย", en: "Pad Thai" },
    { th: "กุ้งทอดซอสมะขาม", en: "Fried Shrimp with Tamarind Sauce" },
    { th: "ปลากะพงทอดน้ำปลา", en: "Deep Fried Sea Bass with Fish Sauce" },
    { th: "ปลากะพงทอดสามรส", en: "Deep Fried Sea Bass with Three-Flavored Sauce" }
];

let existingChoices = [];
if (data[0].options && data[0].options[0]) {
    existingChoices = data[0].options[0].choices;
}

newDessertChoices.forEach(nc => {
    if (!existingChoices.find(c => c.th === nc.th)) {
        existingChoices.push(nc);
    }
});

data.forEach(set => {
    if (set.options) {
        set.options.forEach(opt => {
            opt.choices = existingChoices;
        });
    }
});

const newSet = {
    id: 6,
    name: {
        th: "สยามเลิศรส",
        en: "Siam Lert Ros"
    },
    price: "159",
    desc: {
        th: "เซตสยามเลิศรส รวบรวมเอกลักษณ์ความอร่อยจากทุกภาคของไทย",
        en: "Siam Lert Ros Set. Gathering the unique deliciousness from all regions of Thailand."
    },
    items: [
        {
            type: { th: "ไฮไลท์", en: "Highlight" },
            th: "เซตสยามเลิศรส",
            en: "Siam Lert Ros Set",
            img: "siam_lert_ros.png",
            ingredients: {
                th: [
                    "รวบรวมเอกลักษณ์ความอร่อยจากทุกภาคของไทย",
                    "ไส้อั่ว & ไส้กรอกอีสาน",
                    "ถุงทอง",
                    "ข้าวผัดสับปะรด",
                    "ผัดไทย",
                    "กุ้งทอดซอสมะขาม",
                    "ปลากะพงทอดน้ำปลา",
                    "ปลากะพงทอดสามรส",
                    "ขนมชั้นอัญชัน / ขนมมงคลไทย",
                    "รสชาติจัดจ้าน หรูหรา อลังการ"
                ],
                en: [
                    "Gathering the unique deliciousness from all regions of Thailand.",
                    "Sai Ua & Isan Sausage",
                    "Thung Thong",
                    "Pineapple Fried Rice",
                    "Pad Thai",
                    "Fried Shrimp with Tamarind Sauce",
                    "Deep Fried Sea Bass with Fish Sauce",
                    "Deep Fried Sea Bass with Three-Flavored Sauce",
                    "Butterfly Pea Layer Sweet / Thai Auspicious Desserts",
                    "Bold, Luxurious, and Spectacular Flavors"
                ]
            }
        },
        {
            type: { th: "ของว่าง", en: "Starter" },
            th: "ไส้อั่ว & ไส้กรอกอีสาน",
            en: "Sai Ua & Isan Sausage",
            img: "sai_ua.png",
            ingredients: {
                th: ["เนื้อหมูคุณภาพ", "พริกแกงเผ็ดเหนือ", "สมุนไพรสด", "เสิร์ฟพร้อมขิงและพริกสด"],
                en: ["Quality pork", "Northern red curry paste", "Fresh herbs", "Served with ginger and fresh chili"]
            }
        },
        {
            type: { th: "ของว่าง", en: "Starter" },
            th: "ถุงทอง",
            en: "Thung Thong (Golden Bags)",
            img: "thung_thong.png",
            ingredients: {
                th: ["เนื้อกุ้งสับ", "หมูสับ", "แผ่นปอเปี๊ยะทอดกรอบ", "น้ำจิ้มบ๊วย"],
                en: ["Minced shrimp", "Minced pork", "Crispy spring roll pastry", "Plum sauce"]
            }
        },
        {
            type: { th: "จานหลัก", en: "Main" },
            th: "ข้าวผัดสับปะรด",
            en: "Pineapple Fried Rice",
            img: "pineapple_rice.png",
            ingredients: {
                th: ["ข้าวหอมมะลิ", "เนื้อสับปะรด", "กุ้งสด", "เม็ดมะม่วงหิมพานต์", "ลูกเกด", "ผงกะหรี่"],
                en: ["Jasmine rice", "Pineapple chunks", "Fresh shrimp", "Cashew nuts", "Raisins", "Curry powder"]
            }
        },
        {
            type: { th: "จานหลัก", en: "Main" },
            th: "ผัดไทย",
            en: "Pad Thai",
            img: "pad_thai_premium.png",
            ingredients: {
                th: ["เส้นจันท์", "กุ้งสด", "เต้าหู้", "ถั่วงอก", "กุยช่าย", "ซอสมะขาม", "ถั่วลิสงคั่ว"],
                en: ["Chan noodles", "Fresh shrimp", "Tofu", "Bean sprouts", "Garlic chives", "Tamarind sauce", "Roasted peanuts"]
            }
        },
        {
            type: { th: "จานหลัก", en: "Main" },
            th: "กุ้งทอดซอสมะขาม",
            en: "Fried Shrimp with Tamarind Sauce",
            img: "tamarind_shrimp.png",
            ingredients: {
                th: ["กุ้งตัวโตทอดกรอบ", "ซอสมะขามเปียกเคี่ยวสามรส", "หอมเจียว", "พริกแห้งทอด"],
                en: ["Large crispy fried shrimp", "Three-flavored tamarind sauce", "Fried shallots", "Fried dried chili"]
            }
        },
        {
            type: { th: "จานหลัก", en: "Main" },
            th: "ปลากะพงทอดน้ำปลา",
            en: "Deep Fried Sea Bass with Fish Sauce",
            img: "seabass_fishsauce.png",
            ingredients: {
                th: ["ปลากะพงสด", "น้ำปลาอย่างดี", "น้ำยำมะม่วงรสแซ่บ"],
                en: ["Fresh sea bass", "Premium fish sauce", "Spicy mango salad dressing"]
            }
        },
        {
            type: { th: "จานหลัก", en: "Main" },
            th: "ปลากะพงทอดสามรส",
            en: "Deep Fried Sea Bass with Three-Flavored Sauce",
            img: "seabass_3flavor.png",
            ingredients: {
                th: ["ปลากะพงทอดกรอบ", "ซอสสามรส (เปรี้ยว หวาน เผ็ด)", "พริกชี้ฟ้า", "ใบมะกรูด"],
                en: ["Crispy sea bass", "Three-flavored sauce (sweet, sour, spicy)", "Chili", "Kaffir lime leaves"]
            }
        },
        {
            type: { th: "ของหวาน", en: "Dessert" },
            th: "ขนมชั้นอัญชัน",
            en: "Butterfly Pea Layer Sweet",
            img: "khanom_chan_pea.png",
            ingredients: {
                th: ["แป้งมัน", "แป้งท้าว", "น้ำดอกอัญชัน", "หัวกะทิ", "น้ำตาลทราย"],
                en: ["Tapioca starch", "Arrowroot starch", "Butterfly pea water", "Coconut cream", "Sugar"]
            }
        }
    ],
    options: []
};

for(let i=1; i<=9; i++) {
    newSet.options.push({
        id: "dish_" + i,
        label: { th: "เลือกเมนูที่ " + i, en: "Select Dish " + i },
        choices: existingChoices
    });
}

data.push(newSet);

fs.writeFileSync(dataFile, JSON.stringify(data, null, 4), 'utf8');
console.log("Added Siam Lert Ros set to menu.json and updated master choices.");
