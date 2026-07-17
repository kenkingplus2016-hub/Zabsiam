const fs = require('fs');

const path = 'data/buffet_menu.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const mainsCategory = data.find(c => c.id === 'mains');
const startersCategory = data.find(c => c.id === 'starters');
const dessertsCategory = data.find(c => c.id === 'desserts');

const itemsToMove = [
    "พล่าปลาแซลมอน",
    "ยำแซ่บปลาหมึกยัดไส้",
    "คอหมูย่าง",
    "ข้าวผัดต้มยำกุ้ง",
    "น้ำพริกกะปิ",
    "น้ำพริกหนุ่ม",
    "น้ำพริกอ่อง"
];

// Helper to move item
function moveItems() {
    [startersCategory, dessertsCategory].forEach(category => {
        if (!category) return;
        
        let i = category.items.length;
        while (i--) {
            const item = category.items[i];
            // Check if item.th contains any of the target words
            const shouldMove = itemsToMove.some(target => item.th.includes(target));
            
            if (shouldMove) {
                // Remove from current category
                category.items.splice(i, 1);
                // Add to mains category
                mainsCategory.items.push(item);
                console.log(`Moved ${item.th} to mains.`);
            }
        }
    });
}

moveItems();

fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
console.log("Updated categories in buffet_menu.json");
