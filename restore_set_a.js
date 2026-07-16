const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const restoredMenu = {
  "id": "lunch_box_set_a",
  "name": {
    "th": "Lunch Box (Set A)",
    "en": "Lunch Box (Set A)"
  },
  "price": 22.95,
  "img": "Lunch Box (Set A) 1.jpg",
  "unit": {
    "th": "เซต",
    "en": "Set"
  },
  "desc": {
    "th": "เซตกล่องซิกเนเจอร์สุดคุ้ม: ข้าวกะเพรา (หมูสับ/ไก่สับ/เนื้อสับ) + ไข่ดาว, ส้มตำไทย/ปูปลาร้า, คอหมูย่าง/เสือร้องไห้ พร้อมน้ำจิ้มแจ่ว, แกงเขียวหวาน/แกงแดง และผักเคียง",
    "en": "Ultimate Signature Box: Pad Krapow (Minced Pork/Chicken/Beef) with Rice & Fried Egg, Som Tum, Grilled Pork Neck/Crying Tiger with Jaew, Thai Curry, Side Vegetables"
  },
  "items": {
    "th": {
      "mains": [
        "ข้าวกะเพรา (หมูสับ/ไก่สับ/เนื้อสับ) + ไข่ดาว",
        "แกง (เลือกประเภทและเนื้อสัตว์ได้)",
        "คอหมูย่าง / เสือร้องไห้",
        "ส้มตำ (เลือกประเภทได้)"
      ],
      "starters": [
        "พริกน้ำปลา",
        "น้ำจิ้มแจ่ว",
        "ผักเคียง"
      ]
    },
    "en": {
      "mains": [
        "Pad Krapow (Pork/Chicken/Beef) with Rice & Fried Egg",
        "Thai Curry (Customizable Type & Meat)",
        "Grilled Pork Neck / Crying Tiger",
        "Som Tum (Papaya Salad)"
      ],
      "starters": [
        "Nam Pla Prik",
        "Jaew Dipping Sauce",
        "Side Vegetables"
      ]
    }
  },
  "options": [
    {
      "id": "krapow_meat",
      "label": {
        "th": "เลือกเนื้อสัตว์กะเพรา",
        "en": "Select Basil Stir-Fry Meat"
      },
      "choices": [
        { "th": "หมูสับ", "en": "Minced Pork" },
        { "th": "ไก่สับ", "en": "Minced Chicken" },
        { "th": "เนื้อสับ", "en": "Minced Beef" }
      ]
    },
    {
      "id": "grilled_meat",
      "label": {
        "th": "เลือกเนื้อย่าง",
        "en": "Select Grilled Meat"
      },
      "choices": [
        { "th": "คอหมูย่าง", "en": "Grilled Pork Neck" },
        { "th": "เสือร้องไห้", "en": "Crying Tiger Beef" }
      ]
    },
    {
      "id": "curry_type",
      "label": {
        "th": "เลือกแกง",
        "en": "Select Curry"
      },
      "choices": [
        { "th": "แกงเขียวหวาน", "en": "Green Curry" },
        { "th": "แกงแดง", "en": "Red Curry" },
        { "th": "แกงพะแนง", "en": "Panang Curry" }
      ]
    },
    {
      "id": "curry_meat",
      "label": {
        "th": "เลือกเนื้อสัตว์ในแกง",
        "en": "Select Curry Meat"
      },
      "choices": [
        { "th": "ไก่", "en": "Chicken" },
        { "th": "หมู", "en": "Pork" },
        { "th": "เนื้อ", "en": "Beef" }
      ]
    },
    {
      "id": "somtum_type",
      "label": {
        "th": "เลือกส้มตำ",
        "en": "Select Papaya Salad"
      },
      "choices": [
        { "th": "ส้มตำไทย", "en": "Som Tum Thai" },
        { "th": "ส้มตำปูปลาร้า", "en": "Som Tum Pu Pla Ra" },
        { "th": "ตำแตง", "en": "Spicy Cucumber Salad" }
      ]
    }
  ]
};

// Add to the beginning of the array or after the other boxes
data.splice(1, 0, restoredMenu);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Restored Lunch Box Set A.");
