const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';
const jsonPath = 'data/buffet_menu.json';

// Find the newest media__*.jpg files
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => a.time - b.time); // sort ascending

// We need the last 4 files
const latestFiles = files.slice(-4);

if (latestFiles.length === 4) {
    const mappings = [
        { file: latestFiles[0].name, dest: 'red_curry_chicken.jpg', th: 'แกงแดงไก่', en: 'Red Curry with Chicken', price: 14 },
        { file: latestFiles[1].name, dest: 'red_curry_pork.jpg', th: 'แกงแดงหมู', en: 'Red Curry with Pork', price: 14 },
        { file: latestFiles[2].name, dest: 'red_curry_beef.jpg', th: 'แกงแดงเนื้อ', en: 'Red Curry with Beef', price: 15 },
        { file: latestFiles[3].name, dest: 'red_curry_prawns.jpg', th: 'แกงแดงกุ้ง', en: 'Red Curry with Prawn', price: 15 }
    ];

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const mainsCategory = data.find(c => c.id === 'mains');

    mappings.forEach(map => {
        // Copy image
        const srcPath = path.join(brainDir, map.file);
        const destPath = path.join(imagesDir, map.dest);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${map.file} to ${map.dest}`);

        // Update or add item
        let existingItem = mainsCategory.items.find(i => i.th === map.th);
        if (existingItem) {
            existingItem.img = map.dest;
            console.log(`Updated existing item: ${map.th}`);
        } else {
            mainsCategory.items.push({
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: map.th,
                en: map.en,
                img: map.dest,
                price: map.price,
                unit: 'ถ้วย'
            });
            console.log(`Added new item: ${map.th}`);
        }
    });

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find exactly 4 newly uploaded images.');
}
