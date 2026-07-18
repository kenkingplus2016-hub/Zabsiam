const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';
const jsonPath = 'data/buffet_menu.json';

// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'mixed_fruits.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to mixed_fruits.jpg`);

    // Update the JSON mapping
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    let dessertsCategory = data.find(c => c.id === 'desserts');
    if (dessertsCategory) {
        // Check if it already exists to avoid duplicates
        const exists = dessertsCategory.items.some(i => i.th === 'ผลไม้รวม' || i.en === 'Mixed Fruits');
        if (!exists) {
            dessertsCategory.items.push({
                id: 'item_' + Math.random().toString(36).substring(2, 11),
                th: 'ผลไม้รวม',
                en: 'Mixed Fruits',
                img: 'mixed_fruits.jpg',
                price: 12
            });
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
            console.log('Added Mixed Fruits to JSON successfully.');
        } else {
            // Update image if it already exists
            let item = dessertsCategory.items.find(i => i.th === 'ผลไม้รวม' || i.en === 'Mixed Fruits');
            item.img = 'mixed_fruits.jpg';
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
            console.log('Mixed Fruits already exists, updated the image.');
        }
    } else {
        console.log('Could not find desserts category.');
    }
} else {
    console.log('No newly uploaded images found.');
}
