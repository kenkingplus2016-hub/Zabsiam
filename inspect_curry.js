const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const idsToInspect = ['lunch_box_pad_prik_gaeng', 'lunch_box_vip', '18'];
const inspectData = data.filter(m => idsToInspect.includes(m.id));

console.log(JSON.stringify(inspectData, null, 2));
