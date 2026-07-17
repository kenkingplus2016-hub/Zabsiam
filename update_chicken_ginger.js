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
    const destPath = path.join(imagesDir, 'stir_fried_chicken_ginger.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to stir_fried_chicken_ginger.jpg`);

    // Update the JSON mapping
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Stir-fried Chicken with Ginger
            if (item.th === 'ไก่ผัดขิง' || item.en === 'Stir-fried Chicken with Ginger') {
                item.img = 'stir_fried_chicken_ginger.jpg';
                console.log('Mapped stir_fried_chicken_ginger.jpg to ไก่ผัดขิง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไก่ผัดขิง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}
