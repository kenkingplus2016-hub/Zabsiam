const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';
const jsonPath = 'data/buffet_menu.json';

const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time)
    .slice(0, 5); // get the newest 5

if (files.length === 5) {
    const mappings = [
        { file: files[4].name, dest: 'sweet_sour_chicken.jpg', th: 'ผัดเปรี้ยวหวานไก่' },
        { file: files[3].name, dest: 'sea_bass_lui_suan.jpg', th: 'ปลาซีบาสลุยสวน' },
        { file: files[2].name, dest: 'pad_phed_beef.jpg', th: 'ผัดเผ็ดเนื้อ' },
        { file: files[1].name, dest: 'pad_phed_seabass.jpg', th: 'ผัดเผ็ดปลากระพง' },
        { file: files[0].name, dest: 'sweet_sour_seabass.jpg', th: 'ผัดเปรี้ยวหวานปลากระพง' }
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
    console.log('Expected 5 files but found ' + files.length);
}
