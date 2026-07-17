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
    const destPath = path.join(imagesDir, 'panang_pork.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to panang_pork.jpg`);

    // Update the JSON mapping
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Panang Curry Pork
            if (item.th === 'แกงพะแนงหมู') {
                item.img = 'panang_pork.jpg';
                console.log('Mapped panang_pork.jpg to แกงพะแนงหมู');
                updated++;
            }
        });
    });

    if (updated > 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงพะแนงหมู in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}
