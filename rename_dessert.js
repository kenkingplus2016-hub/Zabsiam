const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/public';
const files = ['menu.html', 'royal.html', 'delivery.html', 'booking.html', 'desserts.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    content = content.replace(/เมนูของหวาน \/ Desserts/g, 'ของหวาน / Desserts');
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated ' + file);
});
