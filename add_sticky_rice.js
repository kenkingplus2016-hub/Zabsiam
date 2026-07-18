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
    const destPath = path.join(imagesDir, 'sticky_rice.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to sticky_rice.jpg`);

    // Update the JSON mapping
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    let riceCategory = data.find(c => c.id === 'rice');
    if (riceCategory) {
        // Check if it already exists to avoid duplicates
        const exists = riceCategory.items.some(i => i.th === 'ข้าวเหนียว' || i.en === 'Sticky Rice');
        if (!exists) {
            riceCategory.items.push({
                id: 'item_' + Math.random().toString(36).substring(2, 11),
                th: 'ข้าวเหนียว',
                en: 'Sticky Rice',
                img: 'sticky_rice.jpg',
                price: 12
            });
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
            console.log('Added Sticky Rice to JSON successfully.');
        } else {
            // Update image if it already exists
            let item = riceCategory.items.find(i => i.th === 'ข้าวเหนียว' || i.en === 'Sticky Rice');
            item.img = 'sticky_rice.jpg';
            fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
            console.log('Sticky Rice already exists, updated the image.');
        }
    } else {
        console.log('Could not find rice category.');
    }
} else {
    console.log('No newly uploaded images found.');
}
