const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data/classic_menu.json', 'utf8'));

let item = data.find(d => d.id == 102);
if (item) {
    item.items.th.mains.push("ข้าวหมกไก่ (Khao Mok Gai)");
    item.items.th.mains.push("วัตถุดิบข้าวหมก: ไก่ 1 ชิ้น, ข้าว 3 ถ้วย, น้ำ, อบเชยป่น 1/2 ช.ช., กานพลูบด 1/2 ช.ช., ลูกผักชีบด 1 ช.ช., ลูกกระวานบด 1/2 ช.ช., ใบกระวาน 5 ใบ, เกลือ 1/2 ช.ต., ยี่หร่าบด 1 ช.ช., ขมิ้น 1 ช.ต., นม 1/3 ถ้วยตวง, เนยละลาย 2 ช.ต., ลูกกระวาน 5 ลูก, ขิงแก่ 3 แว่น, กระเทียม 3-4 กลีบ, หอมแดง 3 หัว, หอมแดงซอย");
    
    item.items.en.mains.push("Khao Mok (Yellow Spiced Biryani Rice)");
    item.items.en.mains.push("Khao Mok Ingredients: 1 pc Chicken, 3 cups Rice, Water, 1/2 tsp Cinnamon, 1/2 tsp Cloves, 1 tsp Coriander seeds, 1/2 tsp Cardamom powder, 5 Bay leaves, 1/2 tbsp Salt, 1 tsp Cumin, 1 tbsp Turmeric, 1/3 cup Milk, 2 tbsp Melted Butter, 5 Cardamom pods, 3 slices Ginger, 3-4 cloves Garlic, 3 Shallots, Sliced shallots");
}

fs.writeFileSync('./data/classic_menu.json', JSON.stringify(data, null, 2), 'utf8');
