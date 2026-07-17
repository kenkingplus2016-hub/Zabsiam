const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';
const jsonPath = 'data/buffet_menu.json';

const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time)
    .slice(0, 3)
    .reverse(); // oldest to newest among the 3

if (files.length === 3) {
    const mappings = [
        { file: files[0].name, dest: 'nam_prik_noom.jpg', th: 'น้ำพริกหนุ่ม' },
        { file: files[1].name, dest: 'nam_prik_ong.jpg', th: 'น้ำพริกอ่อง' },
        { file: files[2].name, dest: 'nam_prik_kapi.jpg', th: 'น้ำพริกกะปิ' }
    ];

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    let updatedCount = 0;

    mappings.forEach(m => {
        fs.copyFileSync(path.join(brainDir, m.file), path.join(imagesDir, m.dest));
        console.log(`Copied ${m.file} to ${m.dest}`);

        data.forEach(category => {
            category.items.forEach(item => {
                if (item.th === m.th) {
                    item.img = m.dest;
                    if (m.th === 'น้ำพริกกะปิ') {
                        item.price = 14; // Increase price because of Pla Too
                        console.log('Updated น้ำพริกกะปิ price to 14');
                    }
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
    console.log('Expected 3 files but found ' + files.length);
}
