const fs = require('fs');
const path = require('path');

const repoPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

try {
    let data = JSON.parse(fs.readFileSync(repoPath, 'utf8'));

    for (let cat of data) {
        if (cat.id === 'desserts') {
            console.log(`Original desserts count: ${cat.items.length}`);
            cat.items = cat.items.filter(item => 
                (item.en && item.en.toLowerCase().includes('mango sticky rice')) || 
                (item.th && item.th.includes('ข้าวเหนียวมะม่วง'))
            );
            console.log(`New desserts count: ${cat.items.length}`);
            
            // Print the remaining items to verify
            cat.items.forEach(i => console.log(`- ${i.en} (${i.th})`));
        }
    }

    fs.writeFileSync(repoPath, JSON.stringify(data, null, 4), 'utf8');
    
    if (fs.existsSync(localPath)) {
        fs.writeFileSync(localPath, JSON.stringify(data, null, 4), 'utf8');
    }
    
    console.log("Updated buffet_menu.json successfully!");
} catch (e) {
    console.error("Error:", e);
}
