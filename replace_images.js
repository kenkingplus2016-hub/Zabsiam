const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\KENDEE\\.gemini\\antigravity\\brain\\9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const destDir = 'public/images';

// Based on the timestamps, assuming ascending order matches the prompt
const mediaFiles = [
    'media__1784259353656.jpg', // Sai Ua
    'media__1784259353666.jpg', // Seabass 3 flavor
    'media__1784259353679.jpg', // Seabass fish sauce
    'media__1784259353750.jpg'  // Tamarind shrimp
];

const destFiles = [
    'sai_ua.jpg',
    'seabass_3flavor.jpg',
    'seabass_fishsauce.jpg',
    'tamarind_shrimp.jpg'
];

mediaFiles.forEach((src, idx) => {
    try {
        fs.copyFileSync(path.join(srcDir, src), path.join(destDir, destFiles[idx]));
        console.log("Copied", src, "to", destFiles[idx]);
    } catch(e) {
        console.error("Failed to copy", src, e.message);
    }
});

// Update menu.json to use .jpg instead of .png for these 4 items
const dataFile = 'data/menu.json';
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const set6 = data.find(s => s.id === 6);
if (set6) {
    set6.items.forEach(item => {
        if (item.img === 'sai_ua.png') item.img = 'sai_ua.jpg';
        if (item.img === 'seabass_3flavor.png') item.img = 'seabass_3flavor.jpg';
        if (item.img === 'seabass_fishsauce.png') item.img = 'seabass_fishsauce.jpg';
        if (item.img === 'tamarind_shrimp.png') item.img = 'tamarind_shrimp.jpg';
    });
}

fs.writeFileSync(dataFile, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated menu.json to point to the new .jpg files.");
