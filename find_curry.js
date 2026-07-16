const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const curryMenus = data.filter(m => {
    const nameTh = (m.name && m.name.th) ? m.name.th : '';
    const nameEn = (m.name && m.name.en) ? m.name.en : '';
    const descTh = (m.desc && m.desc.th) ? m.desc.th : '';
    const descEn = (m.desc && m.desc.en) ? m.desc.en : '';
    
    // Check if any of these contain "แกง" or "curry" (case insensitive)
    return nameTh.includes('แกง') || 
           nameEn.toLowerCase().includes('curry') || 
           descTh.includes('แกง') || 
           descEn.toLowerCase().includes('curry');
});

console.log("Curry menus found:");
curryMenus.forEach(m => console.log(`- ${m.id}: ${m.name.th} / ${m.name.en}`));
