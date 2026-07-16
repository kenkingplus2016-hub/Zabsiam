const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const newMenu = {
  "id": "lunch_box_premium_crying_tiger",
  "name": {
    "th": "Premium Box ผัดกะเพราเสือร้องไห้ + ไข่ดาวลาวา",
    "en": "Premium Box Pad Krapow Crying Tiger & Lava Fried Egg"
  },
  "price": 19.95,
  "img": "moo krob kau prik klua.jpg", // fallback image, user can change later
  "unit": {
    "th": "เซต",
    "en": "Set"
  },
  "desc": {
    "th": "เซตข้าวกล่องสุดพรีเมียม: ผัดกะเพราเนื้อเสือร้องไห้เกรดพรีเมียม รสจัดจ้าน เสิร์ฟพร้อมไข่ดาวลาวาเยิ้มๆ และข้าวที่คุณชื่นชอบ",
    "en": "Premium Lunch Box: Spicy Pad Krapow with premium Crying Tiger Beef. Served with a Lava Fried Egg (runny yolk) and your choice of rice."
  },
  "items": {
    "th": {
      "mains": [
        "ข้าว (เลือกข้าวสวย หรือ ข้าวผัดไข่)",
        "ผัดกะเพราเสือร้องไห้"
      ],
      "starters": [
        "ส้มตำ (เลือกประเภทได้)",
        "ไข่ดาวลาวา",
        "พริกน้ำปลา"
      ]
    },
    "en": {
      "mains": [
        "Rice (Choose Jasmine Rice or Egg Fried Rice)",
        "Spicy Pad Krapow Crying Tiger Beef"
      ],
      "starters": [
        "Som Tum (Choose Type)",
        "Lava Fried Egg (Runny Yolk)",
        "Prik Nam Pla"
      ]
    }
  },
  "options": [
    {
      "id": "rice_type",
      "label": {
        "th": "เลือกประเภทข้าว",
        "en": "Choose Rice"
      },
      "choices": [
        {
          "th": "ข้าวสวย",
          "en": "Jasmine Rice"
        },
        {
          "th": "ข้าวผัดไข่",
          "en": "Egg Fried Rice"
        }
      ]
    },
    {
      "id": "somtum_type",
      "label": {
        "th": "เลือกส้มตำ",
        "en": "Choose Papaya Salad"
      },
      "choices": [
        {
          "th": "ส้มตำไทย",
          "en": "Som Tum Thai"
        },
        {
          "th": "ส้มตำปูปลาร้า",
          "en": "Som Tum Pu Pla Ra"
        },
        {
          "th": "ตำแตง",
          "en": "Spicy Cucumber Salad"
        }
      ]
    }
  ]
};

// Insert it right after the first item (or at the top)
data.splice(1, 0, newMenu);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added new Premium Box Crying Tiger Krapow menu.");
