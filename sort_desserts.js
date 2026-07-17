const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const dessertsCategory = data.find(c => c.id === 'desserts');

if (dessertsCategory) {
    let items = dessertsCategory.items;
    
    // Check if "ผลไม้รวม" exists, if not, create it.
    let mixedFruitIndex = items.findIndex(i => i.th.includes('ผลไม้รวม'));
    let mixedFruitItem;
    if (mixedFruitIndex === -1) {
        mixedFruitItem = {
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: "ผลไม้รวม",
            en: "Mixed Fresh Fruits",
            img: "logo.png",
            price: 12
        };
        console.log("Created ผลไม้รวม");
    } else {
        mixedFruitItem = items.splice(mixedFruitIndex, 1)[0];
    }
    
    // Move Mango Sticky Rice to top
    const mangoIndex = items.findIndex(i => i.th.includes('ข้าวเหนียวมะม่วงน้ำดอกไม้'));
    if (mangoIndex !== -1) {
        const mangoItem = items.splice(mangoIndex, 1)[0];
        items.unshift(mangoItem);
        console.log("Moved Mango Sticky Rice to top");
    }

    // Move Banana in Coconut Milk next to Tub Tim Grob
    const bananaIndex = items.findIndex(i => i.th.includes('บวชชีกล้วย') || i.th.includes('กล้วยบวชชี'));
    let bananaItem;
    if (bananaIndex !== -1) {
        bananaItem = items.splice(bananaIndex, 1)[0];
    }
    
    if (bananaItem) {
        const tubtimIndex = items.findIndex(i => i.th.includes('ทับทิมกรอบ'));
        if (tubtimIndex !== -1) {
            items.splice(tubtimIndex + 1, 0, bananaItem);
            console.log("Moved Banana in Coconut Milk next to Tub Tim Grob");
        } else {
            // If Tub Tim Grob somehow doesn't exist, just push it
            items.push(bananaItem);
            console.log("Tub Tim Grob not found, pushed Banana to end");
        }
    }
    
    // Add Mixed Fruits to the very bottom
    items.push(mixedFruitItem);
    console.log("Moved Mixed Fruits to bottom");
    
    fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
    console.log("Updated buffet_menu.json desserts order.");
} else {
    console.log("Desserts category not found.");
}
