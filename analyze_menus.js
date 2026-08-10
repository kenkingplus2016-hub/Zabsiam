const fs = require('fs');

try {
    const buffetData = JSON.parse(fs.readFileSync('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json', 'utf8'));
    console.log("=== BUFFET MENU CATEGORIES ===");
    buffetData.forEach(cat => {
        console.log(`- ${cat.id}: ${cat.title.th || cat.title} (${cat.items.length} items)`);
    });
} catch(e) {
    console.log("Error reading buffet_menu.json", e.message);
}

try {
    const liveData = JSON.parse(fs.readFileSync('C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\live_menu.json', 'utf8'));
    console.log("\n=== LIVE MENU ITEMS (First 5) ===");
    liveData.slice(0, 5).forEach(item => {
        console.log(`- ${item.id}: ${item.name.th} (${item.name.en})`);
    });
    console.log(`Total live menu items: ${liveData.length}`);
} catch(e) {
    console.log("Error reading live_menu.json", e.message);
}
