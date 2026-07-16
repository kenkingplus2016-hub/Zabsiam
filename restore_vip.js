const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const vipBox = {
  "id": "lunch_box_vip",
  "name": {
    "th": "Special Box Set VIP",
    "en": "Special Box Set VIP"
  },
  "price": 16.95,
  "img": "Special Box Set VIP.jpg",
  "unit": { "th": "เซต", "en": "Set" },
  "desc": {
    "th": "เซตข้าวกล่องสุดพรีเมียม: เลือกเนื้อสัตว์ ไข่ และแกงที่คุณชื่นชอบได้ดั่งใจ",
    "en": "Premium Lunch Box: Customize your meat, egg, and curry exactly how you like it."
  },
  "items": {
    "th": {
      "mains": ["ข้าวสวยหอมมะลิ", "แกงไทย (เลือกชนิดแกงและเนื้อสัตว์ได้)"],
      "starters": ["เมนูไข่ (เลือกไข่ดาว หรือ ไข่เจียว)", "ผักเคียง", "พริกน้ำปลา"]
    },
    "en": {
      "mains": ["Jasmine Rice", "Thai Curry (Choose your curry and meat)"],
      "starters": ["Egg (Choose Fried Egg or Omelette)", "Side Vegetables", "Prik Nam Pla"]
    }
  },
  "options": [
    {
      "id": "curry_type",
      "label": { "th": "เลือกแกง", "en": "Select Curry" },
      "choices": [
        { "th": "แกงเขียวหวาน", "en": "Green Curry" },
        { "th": "แกงแดง", "en": "Red Curry" },
        { "th": "แกงพะแนง", "en": "Panang Curry" },
        { "th": "แกงมัสมั่น", "en": "Massaman Curry" },
        { "th": "แกงกะหรี่", "en": "Yellow Curry" }
      ]
    },
    {
      "id": "curry_meat",
      "label": { "th": "เลือกเนื้อสัตว์ในแกง", "en": "Select Curry Meat" },
      "choices": [
        { "th": "ไก่", "en": "Chicken" },
        { "th": "หมู", "en": "Pork" },
        { "th": "เนื้อ", "en": "Beef" }
      ]
    },
    {
      "id": "egg_type",
      "label": { "th": "เลือกไข่", "en": "Select Egg" },
      "choices": [
        { "th": "ไข่ดาว", "en": "Fried Egg" },
        { "th": "ไข่เจียว", "en": "Thai Omelette" }
      ]
    }
  ]
};

// Check if VIP box already exists (to avoid duplicates)
const existingIndex = data.findIndex(m => m.id === 'lunch_box_vip');
if (existingIndex !== -1) {
    data.splice(existingIndex, 1);
}

// Insert right after the first item (Premium Box)
data.splice(1, 0, vipBox);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added VIP Box right after Premium Box.");
