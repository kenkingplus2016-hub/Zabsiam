const fs = require('fs');
const path = require('path');

const repoPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const localPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\data\\buffet_menu.json';

try {
    let data = JSON.parse(fs.readFileSync(repoPath, 'utf8'));

    const itemsToRemove = [
        "Som Tum Thai", "Rice Skin Dumplings", "Pork Satay", "Chicken Satay", "Sai Ua", 
        "Isan Sausage", "Thung Thong", "Goong Hom Sabai", "Tod Mun Goong", "Tom Yum Goong", 
        "Pork Skewer Milk", "Ma Hor", "Tom Kha Gai", "Tom Kha Goong", "Deep Fried Sea Bass Fish Sauce", 
        "Crab Curry", "Deep Fried Sea Bass Three-Flavored", "Gaeng Som Pae Sa", "Steamed Sea Bass Lime and Garlic", 
        "Steamed Squid Lime and Garlic", "Grilled River Prawns", "Sweet and Sour Chicken", 
        "Sweet and Sour Sea Bass", "Stir-fried Chicken Ginger", "Stir-fried Sea Bass Herbs", 
        "Stir-fried Squid Chili Paste", "Grilled Pork Neck", "Crying Tiger", "Spicy Stuffed Squid", 
        "Thai Grilled Chicken", "Nam Prik", "Tae Po"
    ].map(s => s.toLowerCase());

    const categoriesToRemove = ['vegetables', 'drinks', 'rice', 'noodles'];

    data.forEach(cat => {
        // If it's a category we want to empty completely
        if (categoriesToRemove.includes(cat.id)) {
            cat.items = [];
            return;
        }

        // Otherwise filter the items
        cat.items = cat.items.filter(item => {
            const enName = (item.en || '').toLowerCase();
            const thName = (item.th || '').toLowerCase();
            
            // Check if any remove term is in the english or thai name
            for (let term of itemsToRemove) {
                if (enName.includes(term) || thName.includes(term)) {
                    return false; // exclude this item
                }
            }
            return true; // keep
        });
    });

    fs.writeFileSync(repoPath, JSON.stringify(data, null, 4), 'utf8');
    
    if (fs.existsSync(localPath)) {
        fs.writeFileSync(localPath, JSON.stringify(data, null, 4), 'utf8');
    }
    
    console.log("Removed requested items from buffet_menu.json successfully!");
} catch (e) {
    console.error("Error:", e);
}
