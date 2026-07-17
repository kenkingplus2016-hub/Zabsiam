const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const startersCategory = data.find(c => c.id === 'starters');

if (startersCategory) {
    let items = startersCategory.items;
    
    // Find Tom Kha Goong and set price to 15
    let tkGoong = null;
    const tkgIdx = items.findIndex(i => i.th === 'ต้มข่ากุ้ง');
    if (tkgIdx !== -1) {
        tkGoong = items.splice(tkgIdx, 1)[0];
        tkGoong.price = 15;
    }
    
    // Find Tom Kha Gai
    let tkGai = null;
    const tkgaiIdx = items.findIndex(i => i.th === 'ต้มข่าไก่');
    if (tkgaiIdx !== -1) {
        tkGai = items.splice(tkgaiIdx, 1)[0];
    } else {
        // Create if missing
        tkGai = {
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: "ต้มข่าไก่",
            en: "Tom Kha Gai",
            img: "logo.png",
            price: 14
        };
    }
    
    // Find Tom Yum Goong
    const tygIdx = items.findIndex(i => i.th === 'ต้มยำกุ้ง');
    
    if (tygIdx !== -1) {
        let insertIndex = tygIdx + 1;
        if (tkGoong) {
            items.splice(insertIndex, 0, tkGoong);
            insertIndex++;
        }
        if (tkGai) {
            items.splice(insertIndex, 0, tkGai);
        }
        console.log("Fixed price of ต้มข่ากุ้ง and grouped soups together next to ต้มยำกุ้ง");
    } else {
        // If Tom Yum Goong not found, just put them back
        if (tkGoong) items.push(tkGoong);
        if (tkGai) items.push(tkGai);
        console.log("Could not find ต้มยำกุ้ง to anchor grouping.");
    }
    
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
}
