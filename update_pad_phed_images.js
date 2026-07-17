const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';
const jsonPath = 'data/buffet_menu.json';

const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time)
    .slice(0, 4) // get the newest 4
    .reverse(); // Order from oldest to newest among the 4

if (files.length === 4) {
    const mappings = [
        { file: files[0].name, dest: 'pad_phed_prawns.jpg', th: 'ผัดเผ็ดกุ้ง' },
        { file: files[1].name, dest: 'pad_phed_pork.jpg', th: 'ผัดเผ็ดหมู' },
        { file: files[2].name, dest: 'pad_phed_chicken.jpg', th: 'ผัดเผ็ดไก่' },
        { file: files[3].name, dest: 'pad_phed_beef_new.jpg', th: 'ผัดเผ็ดเนื้อ' }
    ];

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let updatedCount = 0;

    mappings.forEach(m => {
        // Copy file
        fs.copyFileSync(path.join(brainDir, m.file), path.join(imagesDir, m.dest));
        console.log(`Copied ${m.file} to ${m.dest}`);

        // Update JSON
        data.forEach(category => {
            category.items.forEach(item => {
                if (item.th === m.th) {
                    item.img = m.dest;
                    console.log(`Mapped ${m.dest} to ${m.th}`);
                    updatedCount++;
                }
            });
        });
    });

    if (updatedCount > 0) {
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 4), 'utf8');
        console.log('JSON updated successfully.');
    }
} else {
    console.log('Expected 4 files but found ' + files.length);
}
