const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data/classic_menu.json', 'utf8'));

let item = data.find(d => d.id == 102);
if (item) {
    item.desc.th = "ไก่ทอดหาดใหญ่ น้ำอาจาด น้ำจิ้มไก่ หอมเจียว";
    item.desc.en = "Hat Yai Fried Chicken, Ajad Relish, Sweet Chili Sauce, Fried Shallots";
}

fs.writeFileSync('./data/classic_menu.json', JSON.stringify(data, null, 2), 'utf8');
