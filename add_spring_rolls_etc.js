const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const seafoodCat = data.find(c => c.category === 'Seafood');
const meatCat = data.find(c => c.category === 'Meat');
const vegCat = data.find(c => c.category === 'Veg');

const newItems = {
  seafood: [
    {
      "id": "c10",
      "name": { "th": "มินิปอเปี๊ยะสดกุ้ง", "en": "Mini Shrimp Summer Roll" },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": { "th": "ปอเปี๊ยะสดสอดไส้กุ้งเด้งและผักสด เสิร์ฟพร้อมน้ำจิ้มซีฟู้ดรสแซ่บ", "en": "Fresh summer rolls with prawn and vegetables, served with spicy seafood dip." },
      "img": "Mini Shrimp Summer Roll.jpg",
      "main_ingredients": { "th": ["กุ้ง", "แป้งปอเปี๊ยะสด", "ผักสลัด", "น้ำจิ้มซีฟู้ด"], "en": ["Prawn", "Rice Paper", "Salad", "Seafood Sauce"] }
    },
    {
      "id": "c11",
      "name": { "th": "มินิปอเปี๊ยะทอดกุ้ง", "en": "Mini Shrimp Spring Roll" },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": { "th": "ปอเปี๊ยะทอดกรอบสอดไส้กุ้ง เสิร์ฟพร้อมน้ำจิ้มบ๊วย", "en": "Crispy fried spring rolls stuffed with prawn, served with plum sauce." },
      "img": "Mini Shrimp Spring Roll.jpg",
      "main_ingredients": { "th": ["กุ้ง", "แผ่นปอเปี๊ยะ", "น้ำจิ้มบ๊วย"], "en": ["Prawn", "Spring Roll Pastry", "Plum Sauce"] }
    }
  ],
  meat: [
    {
      "id": "c12",
      "name": { "th": "มินิถุงทอง", "en": "Mini Golden Bags" },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": { "th": "ถุงทองทอดกรอบ ไส้ไก่และกุ้งสับปรุงรส เสิร์ฟพร้อมน้ำจิ้มบ๊วย", "en": "Crispy golden bags filled with seasoned minced chicken and prawn, served with plum sauce." },
      "img": "Mini Golden Bags.jpg",
      "main_ingredients": { "th": ["เนื้อไก่สับ", "กุ้ง", "แผ่นเกี๊ยว", "ต้นหอมผูก"], "en": ["Minced Chicken", "Prawn", "Wonton Wrapper", "Chive Tie"] }
    },
    {
      "id": "c14",
      "name": { "th": "มินิล่าเตียงหมูกุ้ง", "en": "Mini Latiang Prawn & Pork" },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": { "th": "ล่าเตียงอาหารว่างไทยโบราณ ไส้หมูและกุ้งสับ ห่อด้วยไข่ตารางสวยงาม", "en": "Traditional Thai snack; seasoned minced pork and prawn wrapped in a delicate egg net." },
      "img": "Mini Latiang.jpeg",
      "main_ingredients": { "th": ["หมูสับ", "กุ้ง", "ไข่ไก่", "พริกชี้ฟ้า"], "en": ["Minced Pork", "Prawn", "Egg Net", "Chili"] }
    }
  ],
  veg: [
    {
      "id": "c13",
      "name": { "th": "มินิปอเปี๊ยะสดเห็ดเข็มทอง", "en": "Mini Enoki Mushroom Summer Roll" },
      "price": 15,
      "unit": "10 ชิ้น / 10 Pcs",
      "desc": { "th": "ปอเปี๊ยะสดมังสวิรัติสอดไส้เห็ดเข็มทองและผักเพื่อสุขภาพ เสิร์ฟพร้อมน้ำจิ้มถั่วลิสง", "en": "Vegetarian fresh summer rolls with enoki mushrooms and veggies, served with peanut sauce." },
      "img": "Mini EnokiMushroom Summer Roll.jpeg",
      "main_ingredients": { "th": ["เห็ดเข็มทอง", "แป้งปอเปี๊ยะสด", "ผักสลัด", "น้ำจิ้มถั่ว"], "en": ["Enoki Mushroom", "Rice Paper", "Salad", "Peanut Sauce"] }
    }
  ]
};

if (seafoodCat) seafoodCat.items.push(...newItems.seafood);
if (meatCat) meatCat.items.push(...newItems.meat);
if (vegCat) vegCat.items.push(...newItems.veg);

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log("Added 5 new menus to Seafood, Meat, and Veg categories.");
