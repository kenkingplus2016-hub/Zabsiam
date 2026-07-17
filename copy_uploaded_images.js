const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';

const fileMappings = {
    // Batch 5: Massaman/Green
    'media__1784317980586.jpg': 'massaman_beef.jpg',
    'media__1784317980595.jpg': 'massaman_chicken.jpg',
    'media__1784317980601.jpg': 'green_curry_prawns.jpg',
    'media__1784317980608.jpg': 'green_curry_chicken_pork.jpg',
    'media__1784317980613.jpg': 'green_curry_beef.jpg',

    // Batch 4: Red/Panang Veg, Prawn/Beef
    'media__1784317863447.jpg': 'red_curry_veg.jpg',
    'media__1784317863455.jpg': 'panang_curry_veg.jpg',
    'media__1784317863464.jpg': 'green_curry_veg.jpg',
    'media__1784317863469.jpg': 'panang_prawns.jpg',
    'media__1784317863504.jpg': 'panang_beef.jpg',

    // Batch 3: Tae Po Curries
    'media__1784317758781.jpg': 'taepo_porkbelly.jpg',
    'media__1784317758787.jpg': 'taepo_prawn.jpg',
    'media__1784317758800.jpg': 'taepo_chicken.jpg',
    'media__1784317758813.jpg': 'taepo_beef.jpg',
    'media__1784317758970.jpg': 'taepo_veg.jpg',

    // Batch 2: Sausage, Tom Kha, Prawn Roll
    'media__1784317563644.jpg': 'sausage.jpg',
    'media__1784317588513.jpg': 'tom_kha_chicken.jpg',
    'media__1784317588521.jpg': 'tom_kha_prawn.jpg',
    'media__1784317588529.jpg': 'prawn_roll.jpg',
    
    // Batch 1 (fallback for taepo_pork just in case)
    'media__1784317200381.jpg': 'taepo_pork.jpg'
};

let copied = 0;
for (const [sourceName, destName] of Object.entries(fileMappings)) {
    const srcPath = path.join(brainDir, sourceName);
    const destPath = path.join(imagesDir, destName);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${sourceName} -> ${destName}`);
        copied++;
    } else {
        console.log(`Source not found: ${sourceName}`);
    }
}

console.log(`Finished copying ${copied} images.`);
