const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/royal_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const seafoodCat = data.find(c => c.category === 'Seafood');
const meatCat = data.find(c => c.category === 'Meat');

const prawnCake = {
  "id": "c7",
  "name": {
    "th": "มินิทอดมันกุ้ง",
    "en": "Mini Crispy Thai Prawn Cake"
  },
  "price": 15,
  "unit": "10 ชิ้น / 10 Pcs",
  "desc": {
    "th": "ทอดมันกุ้งเนื้อเด้งชิ้นพอดีคำ เสิร์ฟพร้อมน้ำจิ้มบ๊วยรสหวานอมเปรี้ยว",
    "en": "Bite-sized crispy prawn cakes served with sweet plum sauce."
  },
  "img": "Mini Crispy Thai Prawn Cake.jpg",
  "main_ingredients": {
    "th": ["กุ้ง", "เกล็ดขนมปัง", "น้ำจิ้มบ๊วย"],
    "en": ["Prawn", "Breadcrumbs", "Plum Sauce"]
  }
};

const saiOua = {
  "id": "c8",
  "name": {
    "th": "มินิไส้อั่ว",
    "en": "Mini Northern Thai Sausage (Sai Oua)"
  },
  "price": 15,
  "unit": "10 ชิ้น / 10 Pcs",
  "desc": {
    "th": "ไส้อั่วสมุนไพรพื้นเมืองเหนือ หอมกลิ่นเครื่องเทศ เสิร์ฟพอดีคำ",
    "en": "Spicy Northern Thai sausage rich in herbs and spices, in bite-sized portions."
  },
  "img": "Mini Northern Thai Sausage (Sai Oua).jpg",
  "main_ingredients": {
    "th": ["เนื้อหมู", "พริกแกงไส้อั่ว", "สมุนไพร"],
    "en": ["Minced Pork", "Sai Oua Curry Paste", "Herbs"]
  }
};

const saiKrokIsan = {
  "id": "c9",
  "name": {
    "th": "มินิไส้กรอกอีสาน",
    "en": "Mini Sai Krok Isan"
  },
  "price": 15,
  "unit": "10 ชิ้น / 10 Pcs",
  "desc": {
    "th": "ไส้กรอกหมูเปรี้ยวสไตล์อีสาน เสิร์ฟพร้อมขิง พริกสด และกะหล่ำปลี",
    "en": "Fermented Isan-style pork sausage served with ginger, fresh chili, and cabbage."
  },
  "img": "Mini Sai Krok Isan.jpg",
  "main_ingredients": {
    "th": ["เนื้อหมู", "ข้าว", "กระเทียม", "เครื่องเคียง"],
    "en": ["Minced Pork", "Rice", "Garlic", "Side Vegetables"]
  }
};

if (seafoodCat && meatCat) {
  seafoodCat.items.push(prawnCake);
  meatCat.items.push(saiOua, saiKrokIsan);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log("Added 3 new Canapes successfully.");
} else {
  console.log("Categories not found!");
}
