const path = require('path');
const fs = require('fs');
const path1 = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const path2 = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api\\buffet';

let data = JSON.parse(fs.readFileSync(path1, 'utf8'));

// --- Recovered Script ---
(() => {





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


console.log("Updated categories in buffet_menu.json");

})();

// --- Recovered Script ---
(() => {





const startersCategory = data.find(c => c.id === 'starters');
const mainsCategory = data.find(c => c.id === 'mains');
const dessertsCategory = data.find(c => c.id === 'desserts');

const targetItems = [
    { th: "หมูปิ้งนมสด", en: "Pork Skewer", price: 14 },
    { th: "ม้าฮ่อ", en: "Ma Hor", price: 12 },
    { th: "แซลมอนลุยสวนเกี๊ยวกรอบ", en: "Salmon Lui Suan Wonton", price: 15 },
    { th: "ปอเปี๊ยะกุ้งทอด", en: "Crispy Prawn Spring Rolls", price: 15 },
    { th: "ปอเปี๊ยะสดเห็ดเข็มทอง", en: "Fresh Spring Rolls with Enoki Mushroom", price: 12 },
    { th: "ต้มข่าไก่", en: "Tom Kha Gai", price: 14 },
    { th: "ต้มข่ากุ้ง", en: "Tom Kha Goong", price: 15 }
];

targetItems.forEach(target => {
    let foundItem = null;
    let foundCategory = null;

    // Search in all categories
    [startersCategory, mainsCategory, dessertsCategory].forEach(category => {
        if (!category) return;
        const index = category.items.findIndex(i => i.th.includes(target.th));
        if (index !== -1) {
            foundItem = category.items[index];
            foundCategory = category;
            // Remove it from current category
            category.items.splice(index, 1);
        }
    });

    if (foundItem) {
        // Move to starters
        startersCategory.items.push(foundItem);
        console.log(`Moved ${foundItem.th} to starters.`);
    } else {
        // Create new item and add to starters
        const newItem = {
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: target.th,
            en: target.en,
            img: "logo.png",
            price: target.price
        };
        startersCategory.items.push(newItem);
        console.log(`Created new item ${target.th} in starters.`);
    }
});


console.log("Updated buffet_menu.json with starters");

})();

// --- Recovered Script ---
(() => {





const mainsCategory = data.find(c => c.id === 'mains');

const targetTh = "ยำวุ้นเส้นกุ้ง";
let found = false;

data.forEach(category => {
    if (category.id === 'mains') return; // skip if already in mains
    
    const index = category.items.findIndex(i => i.th.includes(targetTh));
    if (index !== -1) {
        const item = category.items.splice(index, 1)[0];
        mainsCategory.items.push(item);
        console.log(`Moved ${item.th} from ${category.id} to mains.`);
        found = true;
    }
});

if (found) {
    
    console.log("File saved.");
} else {
    // Maybe it's already in mains?
    const inMains = mainsCategory.items.some(i => i.th.includes(targetTh));
    if (inMains) {
        console.log("Item is already in mains.");
    } else {
        console.log("Item not found anywhere!");
    }
}

})();

// --- Recovered Script ---
(() => {





// Find or create rice category
let riceCategory = data.find(c => c.id === 'rice');
if (!riceCategory) {
    riceCategory = {
        id: "rice",
        title: { th: "เมนูข้าว และ ผัดเส้น (Rice & Noodles)", en: "Rice & Noodles" },
        items: []
    };
    // Insert after mains and veg
    let insertIndex = data.findIndex(c => c.id === 'vegetables');
    if (insertIndex === -1) insertIndex = data.findIndex(c => c.id === 'desserts');
    if (insertIndex === -1) insertIndex = data.length;
    data.splice(insertIndex, 0, riceCategory);
}

// Find all items with "ข้าวผัด" or "ผัดไทย"
const keywords = ["ข้าวผัด", "ผัดไทย", "เส้น"];

data.forEach(category => {
    if (category.id === 'rice') return;

    let i = category.items.length;
    while (i--) {
        const item = category.items[i];
        if (keywords.some(kw => item.th.includes(kw))) {
            const removed = category.items.splice(i, 1)[0];
            riceCategory.items.unshift(removed);
            console.log(`Moved ${item.th} to Rice & Noodles category.`);
        }
    }
});


console.log("Updated buffet_menu.json with Rice category.");

})();

// --- Recovered Script ---
(() => {





let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const originalTh = item.th;
        const originalEn = item.en;

        // Remove (+£X) or (+£ X) pattern and trim
        item.th = item.th.replace(/\(\+\£\d+\)/g, '').trim();
        if (item.en) item.en = item.en.replace(/\(\+\£\d+\)/g, '').trim();

        if (originalTh !== item.th || originalEn !== item.en) {
            console.log(`Cleaned: ${originalTh} -> ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    
    console.log(`Updated ${updatedCount} items in buffet_menu.json`);
} else {
    console.log("No price tags found to remove.");
}

})();

// --- Recovered Script ---
(() => {





const dessertsCategory = data.find(c => c.id === 'desserts');

const bowlItems = [
    "ลอดช่องสิงคโปร์",
    "ทับทิมกรอบ",
    "บวชชีกล้วย",
    "ขนมครองแครงอัญชันมะพร้าวอ่อน",
    "บัวลอยสาคู",
    "บัวลอย 5 สี",
    "ลอดช่องอัญชันใบเตย"
];

// If Lod Chong Singapore is missing, add it
if (dessertsCategory) {
    let foundLodChong = false;
    dessertsCategory.items.forEach(i => {
        if (i.th.includes('ลอดช่องสิงคโปร์')) foundLodChong = true;
    });
    
    if (!foundLodChong) {
        dessertsCategory.items.push({
            id: `item_${Math.random().toString(36).substr(2, 9)}`,
            th: "ลอดช่องสิงคโปร์",
            en: "Lod Chong Singapore",
            img: "logo.png",
            price: 12,
            unit: "ถ้วย"
        });
        console.log("Added ลอดช่องสิงคโปร์");
    }
}

let updatedCount = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (bowlItems.some(bi => item.th.includes(bi))) {
            item.unit = "ถ้วย";
            console.log(`Set unit to ถ้วย for: ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    
    console.log("Updated buffet_menu.json with custom units");
}

})();

// --- Recovered Script ---
(() => {





let updatedCount = 0;
data.forEach(category => {
    category.items.forEach(item => {
        // Match soups but exclude fried rice
        if ((item.th.includes('ต้มยำ') || item.th.includes('ต้มข่า')) && !item.th.includes('ข้าวผัด')) {
            item.unit = "ถ้วย";
            console.log(`Set unit to ถ้วย for: ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    
    console.log("Updated buffet_menu.json with soup units");
}

})();

// --- Recovered Script ---
(() => {





let updatedCount = 0;
data.forEach(category => {
    category.items.forEach(item => {
        // Match curries
        if (item.th.includes('แกง')) {
            item.unit = "ถ้วย";
            console.log(`Set unit to ถ้วย for: ${item.th}`);
            updatedCount++;
        }
    });
});

if (updatedCount > 0) {
    
    console.log(`Updated ${updatedCount} curries in buffet_menu.json`);
} else {
    console.log("No curries found.");
}

})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ขนมหม้อแกง')) {
            delete item.unit; // Revert to default 'จาน'
            console.log(`Reverted unit for ${item.th}`);
        }
    });
});



})();

// --- Recovered Script ---
(() => {





const mappings = {
    'ไส้กรอกอีสาน': 'sausage.jpg',
    'ต้มข่าไก่': 'tom_kha_chicken.jpg',
    'ต้มข่ากุ้ง': 'tom_kha_prawn.jpg',
    'กุ้งห่มสไบ': 'prawn_roll.jpg',
    'ปอเปี๊ยะกุ้งทอด': 'prawn_roll.jpg'
};

let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        // Match exact or contains
        for (const [thName, imgName] of Object.entries(mappings)) {
            if (item.th.includes(thName)) {
                item.img = imgName;
                console.log(`Updated image for ${item.th} -> ${imgName}`);
                updated++;
            }
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully assigned images for ${updated} items.`);
} else {
    console.log("No matching items found.");
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แกงเทโพผักรวมเต้าหู้')) {
            item.img = 'taepo_veg.jpg';
            console.log(`Updated image for ${item.th}`);
            updated++;
        }
    });
});

if (updated > 0) {
    
} else {
    console.log("Not found");
}

})();

// --- Recovered Script ---
(() => {





const mappings = {
    'แกงแดงผักรวมเต้าหู้': 'red_curry_veg.jpg',
    'แกงพะแนงผักรวมเต้าหู้': 'panang_curry_veg.jpg',
    'แกงเขียวหวานผักรวมเต้าหู้': 'green_curry_veg.jpg',
    'แกงพะแนงกุ้ง': 'panang_prawns.jpg',
    'แกงพะแนงเนื้อ': 'panang_beef.jpg'
};

let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (mappings[item.th]) {
            item.img = mappings[item.th];
            console.log(`Updated image for ${item.th} -> ${mappings[item.th]}`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully assigned images for ${updated} items.`);
} else {
    console.log("No matching items found.");
}

})();

// --- Recovered Script ---
(() => {





const mappings = {
    'แกงมัสมันเนื้อ': 'massaman_beef.jpg',
    'แกงมัสมันไก่': 'massaman_chicken.jpg',
    'แกงเขียวหวานกุ้ง': 'green_curry_prawns.jpg',
    'แกงเขียวหวานไก่ / หมู': 'green_curry_chicken_pork.jpg',
    'แกงเขียวหวานเนื้อ': 'green_curry_beef.jpg'
};

let updated = 0;
data.forEach(category => {
    category.items.forEach(item => {
        if (mappings[item.th]) {
            item.img = mappings[item.th];
            console.log(`Updated image for ${item.th} -> ${mappings[item.th]}`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully assigned images for ${updated} items.`);
} else {
    console.log("No matching items found.");
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'sai_ua_new.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to sai_ua_new.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Un-map Isan Sausage if it was mapped to the sausage.jpg
            if (item.th.includes('ไส้กรอกอีสาน') && item.img === 'sausage.jpg') {
                item.img = ''; 
                console.log('Removed sausage.jpg from ไส้กรอกอีสาน');
            }
            // Map Sai Ua
            if (item.th.includes('ไส้อั่ว')) {
                item.img = 'sai_ua_new.jpg';
                console.log('Mapped sai_ua_new.jpg to ไส้อั่ว');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไส้อั่ว in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'isan_sausage_new.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to isan_sausage_new.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Isan Sausage
            if (item.th.includes('ไส้กรอกอีสาน')) {
                item.img = 'isan_sausage_new.jpg';
                console.log('Mapped isan_sausage_new.jpg to ไส้กรอกอีสาน');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไส้กรอกอีสาน in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'chicken_satay_new.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to chicken_satay_new.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Chicken Satay
            if (item.th.includes('ไก่สะเต๊ะ')) {
                item.img = 'chicken_satay_new.jpg';
                console.log('Mapped chicken_satay_new.jpg to ไก่สะเต๊ะ');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไก่สะเต๊ะ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'thung_thong_new.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to thung_thong_new.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Thung Thong
            if (item.th.includes('ถุงทอง')) {
                item.img = 'thung_thong_new.jpg';
                console.log('Mapped thung_thong_new.jpg to ถุงทอง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ถุงทอง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'goong_hom_sabai.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to goong_hom_sabai.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Goong Hom Sabai
            if (item.th.includes('กุ้งห่มสไบ')) {
                item.img = 'goong_hom_sabai.jpg';
                console.log('Mapped goong_hom_sabai.jpg to กุ้งห่มสไบ');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find กุ้งห่มสไบ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'tod_mun_goong.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to tod_mun_goong.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Tod Mun Goong
            if (item.th.includes('ทอดมันกุ้ง')) {
                item.img = 'tod_mun_goong.jpg';
                console.log('Mapped tod_mun_goong.jpg to ทอดมันกุ้ง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ทอดมันกุ้ง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'crispy_prawn_spring_rolls.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to crispy_prawn_spring_rolls.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Crispy Prawn Spring Rolls
            if (item.th.includes('ปอเปี๊ยะกุ้งทอด')) {
                item.img = 'crispy_prawn_spring_rolls.jpg';
                console.log('Mapped crispy_prawn_spring_rolls.jpg to ปอเปี๊ยะกุ้งทอด');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ปอเปี๊ยะกุ้งทอด in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'fresh_spring_rolls_enoki.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to fresh_spring_rolls_enoki.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Fresh Spring Rolls
            if (item.th.includes('ปอเปี๊ยะสดเห็ดเข็มทอง')) {
                item.img = 'fresh_spring_rolls_enoki.jpg';
                console.log('Mapped fresh_spring_rolls_enoki.jpg to ปอเปี๊ยะสดเห็ดเข็มทอง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ปอเปี๊ยะสดเห็ดเข็มทอง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'tom_yum_goong.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to tom_yum_goong.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Exact match for Tom Yum Goong to avoid matching Tom Yum Fried Rice
            if (item.th === 'ต้มยำกุ้ง') {
                item.img = 'tom_yum_goong.jpg';
                console.log('Mapped tom_yum_goong.jpg to ต้มยำกุ้ง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ต้มยำกุ้ง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'thai_curry_chicken.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to thai_curry_chicken.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Thai Curry Chicken
            if (item.th === 'แกงกะหรี่ไก่') {
                item.img = 'thai_curry_chicken.jpg';
                console.log('Mapped thai_curry_chicken.jpg to แกงกะหรี่ไก่');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงกะหรี่ไก่ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    const items = category.items;
    
    const currIndex = items.findIndex(i => i.th.includes('แกงกะหรี่ไก่'));
    const targetIndex = items.findIndex(i => i.th.includes('แกงมัสมันเนื้อ'));
    
    if (currIndex !== -1 && targetIndex !== -1) {
        // Remove แกงกะหรี่ไก่
        const [currItem] = items.splice(currIndex, 1);
        
        // Find new target index (it might have shifted)
        const newTargetIndex = items.findIndex(i => i.th.includes('แกงมัสมันเนื้อ'));
        
        // Insert แกงกะหรี่ไก่ after แกงมัสมันเนื้อ
        items.splice(newTargetIndex + 1, 0, currItem);
        
        console.log('Successfully moved แกงกะหรี่ไก่ next to แกงมัสมันเนื้อ');
    }
});



})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    let items = category.items;
    
    // Check if both exist in this category
    const hasGreenCurryBeef = items.some(i => i.th === 'แกงเขียวหวานเนื้อ');
    const hasRedCurry = items.some(i => i.th.includes('แกงแดง'));
    
    if (hasGreenCurryBeef && hasRedCurry) {
        // Find all red curries
        const redCurries = items.filter(i => i.th.includes('แกงแดง'));
        
        // Remove all red curries from their current positions
        items = items.filter(i => !i.th.includes('แกงแดง'));
        
        // Find the index of แกงเขียวหวานเนื้อ in the new array
        const targetIndex = items.findIndex(i => i.th === 'แกงเขียวหวานเนื้อ');
        
        // Insert red curries right after แกงเขียวหวานเนื้อ
        items.splice(targetIndex + 1, 0, ...redCurries);
        
        // Put the modified items back into category
        category.items = items;
        
        console.log('Successfully moved all แกงแดง after แกงเขียวหวานเนื้อ');
    }
});



})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    let items = category.items;
    
    // Check if both exist in this category
    const hasTarget = items.some(i => i.th === 'ปลากะพงทอดสามรส');
    const hasItemToMove = items.some(i => i.th === 'ปลาซีบาสลุยสวน');
    
    if (hasTarget && hasItemToMove) {
        // Find and remove the item to move
        const currIndex = items.findIndex(i => i.th === 'ปลาซีบาสลุยสวน');
        const [currItem] = items.splice(currIndex, 1);
        
        // Find the new target index
        const targetIndex = items.findIndex(i => i.th === 'ปลากะพงทอดสามรส');
        
        // Insert after target
        items.splice(targetIndex + 1, 0, currItem);
        
        console.log('Successfully moved ปลาซีบาสลุยสวน after ปลากะพงทอดสามรส');
    }
});



})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    let items = category.items;
    
    const hasTarget = items.some(i => i.th === 'แกงพะแนงกุ้ง');
    const hasTaePo = items.some(i => i.th.includes('แกงเทโพ'));
    
    if (hasTarget && hasTaePo) {
        // Find all Tae Po curries
        const taePoCurries = items.filter(i => i.th.includes('แกงเทโพ'));
        
        // Remove them from current positions
        items = items.filter(i => !i.th.includes('แกงเทโพ'));
        
        // Find target index
        const targetIndex = items.findIndex(i => i.th === 'แกงพะแนงกุ้ง');
        
        // Insert right after target
        items.splice(targetIndex + 1, 0, ...taePoCurries);
        
        category.items = items;
        console.log('Successfully moved all แกงเทโพ after แกงพะแนงกุ้ง');
    }
});



})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    let items = category.items;
    
    const index = items.findIndex(i => i.th === 'แกงเขียวหวานไก่ / หมู');
    
    if (index !== -1) {
        const combinedItem = items[index];
        
        // Create Chicken item
        const chickenItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงเขียวหวานไก่',
            en: 'Green Curry Chicken',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Create Pork item
        const porkItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงเขียวหวานหมู',
            en: 'Green Curry Pork',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Replace the combined item with the two new ones
        items.splice(index, 1, chickenItem, porkItem);
        
        console.log('Successfully separated แกงเขียวหวานไก่ / หมู into two items.');
    }
});



})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'green_curry_pork.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to green_curry_pork.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Green Curry Pork
            if (item.th === 'แกงเขียวหวานหมู') {
                item.img = 'green_curry_pork.jpg';
                console.log('Mapped green_curry_pork.jpg to แกงเขียวหวานหมู');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงเขียวหวานหมู in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'gaeng_som_pae_sa.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to gaeng_som_pae_sa.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Gaeng Som Pae Sa Sea Bass
            if (item.th.includes('แกงส้มแป๊ะซะปลากระพง')) {
                item.img = 'gaeng_som_pae_sa.jpg';
                console.log('Mapped gaeng_som_pae_sa.jpg to แกงส้มแป๊ะซะปลากระพง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงส้มแป๊ะซะปลากระพง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'steamed_seabass_lime.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to steamed_seabass_lime.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Steamed Sea Bass with Lime and Garlic
            if (item.th.includes('ปลากระพงนึ่งมะนาว') || item.en.includes('Steamed Sea Bass with Lime and Garlic')) {
                item.img = 'steamed_seabass_lime.jpg';
                console.log('Mapped steamed_seabass_lime.jpg to ปลากระพงนึ่งมะนาว');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ปลากระพงนึ่งมะนาว in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'steamed_squid_lime.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to steamed_squid_lime.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Steamed Squid with Lime and Garlic
            if (item.th.includes('ปลาหมึกนึ่งมะนาว') || item.en.includes('Steamed Squid with Lime and Garlic')) {
                item.img = 'steamed_squid_lime.jpg';
                console.log('Mapped steamed_squid_lime.jpg to ปลาหมึกนึ่งมะนาว');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ปลาหมึกนึ่งมะนาว in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'grilled_river_prawns.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to grilled_river_prawns.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Grilled River Prawns
            if (item.th.includes('กุ้งแม่น้ำย่าง') || item.en.includes('Grilled River Prawns')) {
                item.img = 'grilled_river_prawns.jpg';
                console.log('Mapped grilled_river_prawns.jpg to กุ้งแม่น้ำย่าง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find กุ้งแม่น้ำย่าง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {





data.forEach(category => {
    let items = category.items;
    
    const index = items.findIndex(i => i.th === 'แกงพะแนงหมู / ไก่');
    
    if (index !== -1) {
        const combinedItem = items[index];
        
        // Create Pork item
        const porkItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงพะแนงหมู',
            en: 'Panang Curry with Pork',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Create Chicken item
        const chickenItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'แกงพะแนงไก่',
            en: 'Panang Curry with Chicken',
            img: combinedItem.img,
            price: combinedItem.price,
            unit: combinedItem.unit || 'ถ้วย'
        };
        
        // Replace the combined item with the two new ones
        items.splice(index, 1, porkItem, chickenItem);
        
        console.log('Successfully separated แกงพะแนงหมู / ไก่ into two items.');
    }
});



})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'panang_pork.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to panang_pork.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Panang Curry Pork
            if (item.th === 'แกงพะแนงหมู') {
                item.img = 'panang_pork.jpg';
                console.log('Mapped panang_pork.jpg to แกงพะแนงหมู');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงพะแนงหมู in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'panang_chicken.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to panang_chicken.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Panang Curry Chicken
            if (item.th === 'แกงพะแนงไก่') {
                item.img = 'panang_chicken.jpg';
                console.log('Mapped panang_chicken.jpg to แกงพะแนงไก่');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงพะแนงไก่ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'squid_chili_paste.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to squid_chili_paste.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Stir-fried Squid with Chili Paste
            if (item.th.includes('ปลาหมึกผัดพริกเผา') || item.en.includes('Stir-fried Squid with Chili Paste')) {
                item.img = 'squid_chili_paste.jpg';
                console.log('Mapped squid_chili_paste.jpg to ปลาหมึกผัดพริกเผา');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ปลาหมึกผัดพริกเผา in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {




let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'ผัดฉ่าทะเล' || item.th === 'ผัดฉ่า') {
            item.th = 'ผัดฉ่าปลากระพง';
            item.en = 'Stir-fried Sea Bass with Herbs and Spices (Phad Cha)';
            updated = true;
            console.log('Updated to ผัดฉ่าปลากระพง');
        } else if (item.th.includes('ผัดฉ่า')) {
            item.th = 'ผัดฉ่าปลากระพง';
            item.en = 'Stir-fried Sea Bass with Herbs and Spices (Phad Cha)';
            updated = true;
            console.log(`Updated ${item.th} to ผัดฉ่าปลากระพง`);
        }
    });
});

if (updated) {
    
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find ผัดฉ่า in the JSON.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'phad_cha_seabass.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to phad_cha_seabass.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Phad Cha Sea Bass
            if (item.th === 'ผัดฉ่าปลากระพง') {
                item.img = 'phad_cha_seabass.jpg';
                console.log('Mapped phad_cha_seabass.jpg to ผัดฉ่าปลากระพง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดฉ่าปลากระพง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {




let updated = false;

data.forEach(category => {
    let items = category.items;
    const index = items.findIndex(i => i.th === 'ผัดเผ็ด' || i.en.includes('Pad Phed'));
    
    if (index !== -1) {
        // Change the existing one to Sea Bass
        const existingItem = items[index];
        existingItem.th = 'ผัดเผ็ดปลากระพง';
        existingItem.en = 'Pad Phed Sea Bass (Spicy Stir-fried Red Curry)';
        existingItem.price = 15;
        
        // Add the new ones
        const newItems = [
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดกุ้ง',
                en: 'Pad Phed Prawns (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 15
            },
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดหมู',
                en: 'Pad Phed Pork (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 14
            },
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดไก่',
                en: 'Pad Phed Chicken (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 14
            },
            {
                id: 'item_' + Math.random().toString(36).substr(2, 9),
                th: 'ผัดเผ็ดเนื้อ',
                en: 'Pad Phed Beef (Spicy Stir-fried Red Curry)',
                img: 'logo.png',
                price: 15
            }
        ];
        
        items.splice(index + 1, 0, ...newItems);
        updated = true;
        console.log('Successfully updated Pad Phed and added variants.');
    }
});

if (updated) {
    
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find ผัดเผ็ด in the JSON.');
}

})();

// --- Recovered Script ---
(() => {




let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.en.includes('Sweet and Sour Stir-fry') || item.th.includes('ผัดเปรี้ยวหวาน')) {
            item.th = 'ผัดเปรี้ยวหวานไก่';
            item.en = 'Sweet and Sour Chicken';
            updated = true;
            console.log(`Updated to ผัดเปรี้ยวหวานไก่ (Sweet and Sour Chicken)`);
        }
    });
});

if (updated) {
    
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find Sweet and Sour Stir-fry in the JSON.');
}

})();

// --- Recovered Script ---
(() => {




let updated = false;

data.forEach(category => {
    let items = category.items;
    const index = items.findIndex(i => i.th === 'ผัดเปรี้ยวหวานไก่' || i.en === 'Sweet and Sour Chicken');
    
    if (index !== -1) {
        // Add new item
        const newItem = {
            id: 'item_' + Math.random().toString(36).substr(2, 9),
            th: 'ผัดเปรี้ยวหวานปลากระพง',
            en: 'Sweet and Sour Sea Bass',
            img: 'logo.png', // Default image until uploaded
            price: 15
        };
        
        items.splice(index + 1, 0, newItem);
        updated = true;
        console.log('Successfully added Sweet and Sour Sea Bass.');
    }
});

if (updated) {
    
    console.log('JSON updated successfully.');
} else {
    console.log('Could not find Sweet and Sour Chicken in the JSON.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


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
        
        console.log('JSON updated successfully.');
    }
} else {
    console.log('Expected 5 files but found ' + files.length);
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


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
        
        console.log('JSON updated successfully.');
    }
} else {
    console.log('Expected 4 files but found ' + files.length);
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'taepo_pork_new.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to taepo_pork_new.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Tae Po Curry Pork
            if (item.th === 'แกงเทโพหมู') {
                item.img = 'taepo_pork_new.jpg';
                console.log('Mapped taepo_pork_new.jpg to แกงเทโพหมู');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find แกงเทโพหมู in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pad_phed_pork_updated.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pad_phed_pork_updated.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Pad Phed Pork
            if (item.th === 'ผัดเผ็ดหมู') {
                item.img = 'pad_phed_pork_updated.jpg';
                console.log('Mapped pad_phed_pork_updated.jpg to ผัดเผ็ดหมู');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดเผ็ดหมู in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {




let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แกง') && item.th.includes('เนื้อ')) {
            if (item.price !== 16) {
                console.log(`Updating ${item.th} price from ${item.price} to 16`);
                item.price = 16;
                updatedCount++;
            }
        }
    });
});

if (updatedCount > 0) {
    
    console.log(`Updated ${updatedCount} beef curries to 16 pounds.`);
} else {
    console.log('All beef curries are already 16 pounds.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'stir_fried_chicken_ginger.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to stir_fried_chicken_ginger.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Stir-fried Chicken with Ginger
            if (item.th === 'ไก่ผัดขิง' || item.en === 'Stir-fried Chicken with Ginger') {
                item.img = 'stir_fried_chicken_ginger.jpg';
                console.log('Mapped stir_fried_chicken_ginger.jpg to ไก่ผัดขิง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไก่ผัดขิง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


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
        
        console.log('JSON updated successfully.');
    }
} else {
    console.log('Expected 3 files but found ' + files.length);
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pad_phed_beef_final.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pad_phed_beef_final.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            // Map Pad Phed Beef
            if (item.th === 'ผัดเผ็ดเนื้อ' || item.en.includes('Pad Phed Beef')) {
                item.img = 'pad_phed_beef_final.jpg';
                console.log('Mapped pad_phed_beef_final.jpg to ผัดเผ็ดเนื้อ');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดเผ็ดเนื้อ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'crab_curry.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to crab_curry.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'ปูผัดผงกะหรี่') {
                item.img = 'crab_curry.jpg';
                console.log('Mapped crab_curry.jpg to ปูผัดผงกะหรี่');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ปูผัดผงกะหรี่ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'crying_tiger.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to crying_tiger.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'เสือร้องไห้') {
                item.img = 'crying_tiger.jpg';
                console.log('Mapped crying_tiger.jpg to เสือร้องไห้');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find เสือร้องไห้ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'grilled_pork_neck_new.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to grilled_pork_neck_new.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'คอหมูย่าง') {
                item.img = 'grilled_pork_neck_new.jpg';
                console.log('Mapped grilled_pork_neck_new.jpg to คอหมูย่าง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find คอหมูย่าง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pla_goong.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pla_goong.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'พล่ากุ้ง') {
                item.img = 'pla_goong.jpg';
                console.log('Mapped pla_goong.jpg to พล่ากุ้ง');
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find พล่ากุ้ง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'grilled_chicken.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to grilled_chicken.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'ไก่ย่าง' || item.en.toLowerCase().includes('grilled chicken')) {
                item.img = 'grilled_chicken.jpg';
                console.log('Mapped grilled_chicken.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไก่ย่าง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'hatyai_fried_chicken.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to hatyai_fried_chicken.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ไก่ทอดหาดใหญ่') || item.en.toLowerCase().includes('hat yai')) {
                item.img = 'hatyai_fried_chicken.jpg';
                console.log('Mapped hatyai_fried_chicken.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไก่ทอดหาดใหญ่ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pineapple_fried_rice.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pineapple_fried_rice.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'ข้าวผัดสับปะรด') {
                item.img = 'pineapple_fried_rice.jpg';
                console.log('Mapped pineapple_fried_rice.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ข้าวผัดสับปะรด in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'shrimp_paste_fried_rice.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to shrimp_paste_fried_rice.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.en.toLowerCase() === 'shrimp paste fried rice') {
                item.img = 'shrimp_paste_fried_rice.jpg';
                console.log('Mapped shrimp_paste_fried_rice.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find Shrimp Paste Fried Rice in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pad_thai_prawns.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pad_thai_prawns.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ผัดไทยกุ้ง') || item.en.toLowerCase().includes('pad thai with prawn')) {
                item.img = 'pad_thai_prawns.jpg';
                console.log('Mapped pad_thai_prawns.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดไทยกุ้ง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pad_thai_veg.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pad_thai_veg.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ผัดไทยผักรวม') || item.en.toLowerCase().includes('pad thai with mixed vegetables')) {
                item.img = 'pad_thai_veg.jpg';
                console.log('Mapped pad_thai_veg.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดไทยผักรวม in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'yum_woon_sen_moo_yor.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to yum_woon_sen_moo_yor.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ยำวุ้นเส้น') || item.en.toLowerCase().includes('glass noodle salad with vietnamese pork sausage')) {
                item.img = 'yum_woon_sen_moo_yor.jpg';
                console.log('Mapped yum_woon_sen_moo_yor.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ยำวุ้นเส้นหมูยอ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {




let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'ยำวุ้นเส้นกุ้ง') {
            item.img = 'logo.png'; // Revert to logo
            console.log('Reverted ยำวุ้นเส้นกุ้ง to logo.png');
            updated = true;
        }
    });
});

if (updated) {
    
    console.log('JSON updated successfully.');
} else {
    console.log('No changes needed.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'yum_woon_sen_shrimp.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to yum_woon_sen_shrimp.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'ยำวุ้นเส้นกุ้ง' || item.en.toLowerCase().includes('glass noodle salad with shrimp') || item.en.toLowerCase().includes('glass noodle salad with prawn')) {
                item.img = 'yum_woon_sen_shrimp.jpg';
                console.log('Mapped yum_woon_sen_shrimp.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ยำวุ้นเส้นกุ้ง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'bok_choy.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to bok_choy.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ผัดผักฉ่อย') || item.en.toLowerCase().includes('bok choy')) {
                item.img = 'bok_choy.jpg';
                console.log('Mapped bok_choy.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดผักฉ่อย in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'asparagus.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to asparagus.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('หน่อไม้ฝรั่งผัดน้ำมันหอย') || item.en.toLowerCase().includes('asparagus')) {
                item.img = 'asparagus.jpg';
                console.log('Mapped asparagus.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find หน่อไม้ฝรั่งผัดน้ำมันหอย in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'tom_yum_goong_fried_rice.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to tom_yum_goong_fried_rice.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'ข้าวผัดต้มยำกุ้ง' || item.en.toLowerCase().includes('tom yum goong fried rice')) {
                item.img = 'tom_yum_goong_fried_rice.jpg';
                console.log('Mapped tom_yum_goong_fried_rice.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ข้าวผัดต้มยำกุ้ง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pad_thai_chicken.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pad_thai_chicken.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th === 'ผัดไทยไก่' || item.en.toLowerCase().includes('pad thai with chicken')) {
                item.img = 'pad_thai_chicken.jpg';
                console.log('Mapped pad_thai_chicken.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ผัดไทยไก่ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'krong_krang_butterfly_pea.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to krong_krang_butterfly_pea.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ขนมครองแครง') || item.en.toLowerCase().includes('krong krang')) {
                item.img = 'krong_krang_butterfly_pea.jpg';
                console.log('Mapped krong_krang_butterfly_pea.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ขนมครองแครง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'bua_loy_sago.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to bua_loy_sago.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('บัวลอยสาคู') || item.en.toLowerCase().includes('bua loy sago')) {
                item.img = 'bua_loy_sago.jpg';
                console.log('Mapped bua_loy_sago.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find บัวลอยสาคู in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'bua_loy_5_color.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to bua_loy_5_color.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('บัวลอย 5 สี') || item.en.toLowerCase().includes('5-color bua loy')) {
                item.img = 'bua_loy_5_color.jpg';
                console.log('Mapped bua_loy_5_color.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find บัวลอย 5 สี in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'lod_chong_butterfly_pea.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to lod_chong_butterfly_pea.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ลอดช่องอัญชัน') || item.en.toLowerCase().includes('lod chong butterfly pea')) {
                item.img = 'lod_chong_butterfly_pea.jpg';
                console.log('Mapped lod_chong_butterfly_pea.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ลอดช่องอัญชัน in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'khanom_tom.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to khanom_tom.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ขนมต้มไทยโบราณ') || item.en.toLowerCase().includes('traditional thai coconut dumplings')) {
                item.img = 'khanom_tom.jpg';
                console.log('Mapped khanom_tom.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ขนมต้มไทยโบราณ in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'khanom_chan_pandan.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to khanom_chan_pandan.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ขนมชั้นใบเตย') || item.en.toLowerCase().includes('pandan layer sweet')) {
                item.img = 'khanom_chan_pandan.jpg';
                console.log('Mapped khanom_chan_pandan.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ขนมชั้นใบเตย in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'khanom_chan_butterfly_pea.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to khanom_chan_butterfly_pea.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ขนมชั้นอัญชัน') || item.en.toLowerCase().includes('butterfly pea layer sweet')) {
                item.img = 'khanom_chan_butterfly_pea.jpg';
                console.log('Mapped khanom_chan_butterfly_pea.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ขนมชั้นอัญชัน in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'pandan_coconut_jelly.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to pandan_coconut_jelly.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('วุ้นกะทิใบเตย') || item.en.toLowerCase().includes('pandan coconut jelly')) {
                item.img = 'pandan_coconut_jelly.jpg';
                console.log('Mapped pandan_coconut_jelly.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find วุ้นกะทิใบเตย in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'butterfly_pea_coconut_jelly.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to butterfly_pea_coconut_jelly.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('วุ้นกะทิอัญชัน') || item.en.toLowerCase().includes('butterfly pea coconut jelly')) {
                item.img = 'butterfly_pea_coconut_jelly.jpg';
                console.log('Mapped butterfly_pea_coconut_jelly.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find วุ้นกะทิอัญชัน in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'khanom_mo_kaeng.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to khanom_mo_kaeng.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ขนมหม้อแกง') || item.en.toLowerCase().includes('khanom mo kaeng')) {
                item.img = 'khanom_mo_kaeng.jpg';
                console.log('Mapped khanom_mo_kaeng.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ขนมหม้อแกง in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'khanom_piak_poon.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to khanom_piak_poon.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ขนมเปียกปูน') || item.en.toLowerCase().includes('khanom piak poon')) {
                item.img = 'khanom_piak_poon.jpg';
                console.log('Mapped khanom_piak_poon.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ขนมเปียกปูน in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'tako_corn.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to tako_corn.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ตะโก้ข้าวโพด') || item.en.toLowerCase().includes('tako (sweet corn thai pudding)')) {
                item.img = 'tako_corn.jpg';
                console.log('Mapped tako_corn.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ตะโก้ข้าวโพด in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'tako_taro.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to tako_taro.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ตะโก้เผือก') || item.en.toLowerCase().includes('taro thai pudding')) {
                item.img = 'tako_taro.jpg';
                console.log('Mapped tako_taro.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ตะโก้เผือก in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'coconut_ice_cream.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to coconut_ice_cream.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ไอศกรีมกะทิข้าวเหนียว') || item.en.toLowerCase().includes('coconut ice cream with sticky rice')) {
                item.img = 'coconut_ice_cream.jpg';
                console.log('Mapped coconut_ice_cream.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไอศกรีมกะทิข้าวเหนียว in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {



const brainDir = 'C:/Users/KENDEE/.gemini/antigravity/brain/9d10d3e1-29fa-4160-9fdc-24b2e2180579';
const imagesDir = 'public/images';


// Find the newest media__*.jpg file
const files = fs.readdirSync(brainDir)
    .filter(f => f.startsWith('media__') && f.endsWith('.jpg'))
    .map(f => ({name: f, time: fs.statSync(path.join(brainDir, f)).mtime.getTime()}))
    .sort((a,b) => b.time - a.time);

if (files.length > 0) {
    const newestFile = files[0].name;
    const srcPath = path.join(brainDir, newestFile);
    const destPath = path.join(imagesDir, 'mango_ice_cream.jpg');
    
    // Copy the file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${newestFile} to mango_ice_cream.jpg`);

    // Update the JSON mapping
    
    let updated = 0;
    
    data.forEach(category => {
        category.items.forEach(item => {
            if (item.th.includes('ไอศกรีมมะม่วงข้าวเหนียว') || item.en.toLowerCase().includes('mango ice cream with sticky rice')) {
                item.img = 'mango_ice_cream.jpg';
                console.log('Mapped mango_ice_cream.jpg to', item.th);
                updated++;
            }
        });
    });

    if (updated > 0) {
        
        console.log('JSON updated successfully.');
    } else {
        console.log('Could not find ไอศกรีมมะม่วงข้าวเหนียว in the JSON.');
    }
} else {
    console.log('No newly uploaded images found.');
}

})();

// --- Recovered Script ---
(() => {





let removedCount = 0;

data.forEach(category => {
    const originalLength = category.items.length;
    category.items = category.items.filter(item => !(item.th === 'ยำส้มโอ' && item.en === 'Pomelo Salad'));
    removedCount += originalLength - category.items.length;
});

if (removedCount > 0) {
    
    console.log(`Removed ${removedCount} item(s) successfully.`);
} else {
    console.log('Could not find ยำส้มโอ (Pomelo Salad) to remove.');
}

})();

// --- Recovered Script ---
(() => {






let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('คอหมูย่าง') || item.th.includes('เสือร้องไห้') || item.en.toLowerCase().includes('grilled pork neck') || item.en.toLowerCase().includes('crying tiger')) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find คอหมูย่าง or เสือร้องไห้ in the menu.');
}

})();

// --- Recovered Script ---
(() => {






let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('เสือร้องไห้') || item.en.toLowerCase().includes('crying tiger')) {
            item.price = 18;
            console.log(`Updated price for ${item.th} (${item.en}) to £18`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find เสือร้องไห้ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('กุ้งแม่น้ำย่าง') || item.en.toLowerCase().includes('grilled river prawn')) {
            item.price = 45;
            console.log(`Updated price for ${item.th} (${item.en}) to £45`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find กุ้งแม่น้ำย่าง in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวเหนียว') || item.en.toLowerCase().includes('sticky rice')) {
            item.price = 8;
            console.log(`Updated price for ${item.th} (${item.en}) to £8`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ข้าวเหนียว in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToFix = [
    'ข้าวเหนียวมะม่วงน้ำดอกไม้',
    'ไอศกรีมกะทิข้าวเหนียว',
    'ไอศกรีมมะม่วงข้าวเหนียวมูน'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToFix.includes(item.th)) {
            item.price = 12;
            console.log(`Reverted price for ${item.th} to £12`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully fixed ${updated} items.`);
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวสวย') || item.en.toLowerCase() === 'jasmine rice' || item.en.toLowerCase().includes('steamed jasmine rice')) {
            item.price = 5;
            console.log(`Updated price for ${item.th} (${item.en}) to £5`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ข้าวสวย in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const wholeFishNames = [
    'เมี่ยงคำปลาซีบาส',
    'ปลากะพงทอดน้ำปลา',
    'ปลากะพงทอดสามรส',
    'ปลาซีบาสลุยสวน',
    'แกงส้มแป๊ะซะปลากระพง',
    'ปลากระพงนึ่งมะนาว'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (wholeFishNames.some(name => item.th.includes(name))) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items updated.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ยำส้มโอกุ้งสด') || item.en.toLowerCase().includes('pomelo salad with shrimp')) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ยำส้มโอกุ้งสด in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('เมี่ยงคำส้มโอกุ้ง') || item.en.toLowerCase().includes('pomelo miang kham')) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find เมี่ยงคำส้มโอกุ้ง in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แซลมอนลุยสวนเกี๊ยวกรอบ') || item.en.toLowerCase().includes('salmon lui suan wonton')) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find แซลมอนลุยสวนเกี๊ยวกรอบ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'กุ้งห่มสไบ',
    'ทอดมันกุ้ง',
    'ปอเปี๊ยะกุ้งทอด'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 16;
            console.log(`Updated price for ${item.th} (${item.en}) to £16`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'ต้มยำกุ้ง',
    'ต้มข่ากุ้ง',
    'ต้มข่าไก่'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Exact match or strict inclusion to avoid hitting "ข้าวผัดต้มยำกุ้ง"
        if (item.th === 'ต้มยำกุ้ง' || item.th === 'ต้มข่ากุ้ง' || item.th === 'ต้มข่าไก่') {
            item.price = 5;
            console.log(`Updated price for ${item.th} (${item.en}) to £5`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'ส้มตำไทย' || item.en.toLowerCase() === 'som tum thai') {
            item.price = 12;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £12 and unit to 6 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ส้มตำไทย in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'ยำส้มโอกุ้งสด',
    'เมี่ยงคำปลาซีบาส',
    'แซลมอนลุยสวนเกี๊ยวกรอบ',
    'เมี่ยงคำส้มโอกุ้ง'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 16;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to 6 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const piecesItems = [
    'ลาบไก่',
    'ลาบหมู',
    'ข้าวเกรียบปากหม้อ'
];

const skewerItems = [
    'หมูสะเต๊ะ',
    'หมูปิ้งนมสด',
    'ไก่สะเต๊ะ'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Group 1: 14 / 6 ชิ้น
        if (piecesItems.some(name => item.th.includes(name))) {
            item.price = 14;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 6 ชิ้น`);
            updated++;
        }
        
        // Group 2: 14 / 6 ไม้
        if (skewerItems.some(name => item.th.includes(name) || (name === 'หมูปิ้งนมสด' && item.en.toLowerCase().includes('pork skewer')))) {
            item.price = 14;
            item.unit = '6 ไม้';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 6 ไม้`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'ไส้อั่ว',
    'ไส้กรอกอีสาน'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 14;
            item.unit = '120 กรัม';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 120 กรัม`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'ถุงทอง',
    'กุ้งห่มสไบ',
    'ทอดมันกุ้ง',
    'ปอเปี๊ยะกุ้งทอด'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 16;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to 6 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'ม้าฮ่อ',
    'ปอเปี๊ยะสดเห็ดเข็มทอง'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 12;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £12 and unit to 6 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const itemsToUpdate = [
    'แกงเขียวหวานไก่',
    'แกงเขียวหวานหมู',
    'แกงแดงไก่',
    'แกงแดงหมู',
    'แกงมัสมันไก่',
    'แกงกะหรี่ไก่',
    'แกงพะแนงหมู',
    'แกงพะแนงไก่',
    'แกงเทโพไก่',
    'แกงเทโพหมู',
    'แกงเทโพหมูสามชั้น'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Use exact match or strict inclusion to ensure we hit the right curries
        // E.g., item.th === 'แกงเขียวหวานไก่'
        if (itemsToUpdate.some(name => item.th.includes(name))) {
            item.price = 14;
            item.unit = '750 กรัม 6 ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £14 and unit to 750 กรัม 6 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        // Ensure it's a curry (แกง) and not a soup (ต้ม)
        if (item.th.startsWith('แกง') || item.en.toLowerCase().includes('curry')) {
            // Check for prawn (กุ้ง)
            if (item.th.includes('กุ้ง') || item.en.toLowerCase().includes('prawn')) {
                item.price = 16;
                item.unit = '750 กรัม 6 ถ้วย';
                console.log(`Updated Prawn Curry: ${item.th} to £16 and 750 กรัม 6 ถ้วย`);
                updated++;
            }
            // Check for beef (เนื้อ)
            else if (item.th.includes('เนื้อ') || item.en.toLowerCase().includes('beef')) {
                item.price = 18;
                item.unit = '750 กรัม 6 ถ้วย';
                console.log(`Updated Beef Curry: ${item.th} to £18 and 750 กรัม 6 ถ้วย`);
                updated++;
            }
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ผักรวมเต้าหู้') && item.th.startsWith('แกง')) {
            item.price = 14;
            item.unit = '750 กรัม 6 ถ้วย';
            console.log(`Updated Tofu Curry: ${item.th} to £14 and 750 กรัม 6 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ปูผัดผงกะหรี่') || item.en.toLowerCase().includes('crab curry')) {
            item.price = 45;
            item.unit = '500 กรัม 2 จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £45 and unit to 500 กรัม 2 จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ปูผัดผงกะหรี่ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const fishNames = [
    'เมี่ยงคำปลาซีบาส',
    'ปลากะพงทอดน้ำปลา',
    'ปลากะพงทอดสามรส',
    'ปลาซีบาสลุยสวน',
    'แกงส้มแป๊ะซะปลากระพง',
    'ปลากระพงนึ่งมะนาว'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (fishNames.some(name => item.th.includes(name))) {
            item.price = 16; // Ensure price is 16
            item.unit = '225g จาน';
            console.log(`Updated unit for ${item.th} (${item.en}) to 225g จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items updated.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const fishNames = [
    'แกงส้มแป๊ะซะปลากระพง',
    'ปลากระพงนึ่งมะนาว'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (fishNames.some(name => item.th.includes(name))) {
            item.price = 29;
            item.unit = '450g หม้อไฟ';
            console.log(`Updated price for ${item.th} (${item.en}) to £29 and unit to 450g หม้อไฟ`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items updated.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ปลาหมึกนึ่งมะนาว') || item.en.toLowerCase().includes('steamed squid')) {
            item.price = 35;
            item.unit = '450g หม้อไฟ';
            console.log(`Updated price for ${item.th} (${item.en}) to £35 and unit to 450g หม้อไฟ`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ปลาหมึกนึ่งมะนาว in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('กุ้งแม่น้ำย่าง') || item.en.toLowerCase().includes('river prawn')) {
            item.price = 45;
            item.unit = '2 ตัว';
            console.log(`Updated price for ${item.th} (${item.en}) to £45 and unit to 2 ตัว`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find กุ้งแม่น้ำย่าง in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const updates = [
    { name: 'ผัดฉ่าปลากระพง', price: 16, unit: 'จาน' },
    { name: 'ผัดเผ็ดปลากระพง', price: 16, unit: 'จาน' },
    { name: 'ผัดเปรี้ยวหวานปลากระพง', price: 16, unit: 'จาน' },
    { name: 'ปลาหมึกผัดพริกเผา', price: 18, unit: 'จาน' },
    { name: 'ผัดเผ็ดกุ้ง', price: 15, unit: 'จาน' },
    { name: 'ผัดเผ็ดเนื้อ', price: 18, unit: 'จาน' },
    { name: 'ผัดเปรี้ยวหวานไก่', price: 14, unit: 'จาน' }
];

data.forEach(category => {
    category.items.forEach(item => {
        updates.forEach(update => {
            if (item.th.includes(update.name)) {
                item.price = update.price;
                item.unit = update.unit;
                console.log(`Updated ${item.th} to £${update.price} and unit to ${update.unit}`);
                updated++;
            }
        });
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const namprik = [
    'น้ำพริกอ่อง',
    'น้ำพริกหนุ่ม',
    'น้ำพริกกะปิ'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (namprik.some(name => item.th.includes(name))) {
            item.unit = 'ชุด';
            console.log(`Updated unit for ${item.th} (${item.en}) to ชุด (Set)`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find those chili dips in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const meats = [
    'คอหมูย่าง',
    'เสือร้องไห้'
];

data.forEach(category => {
    category.items.forEach(item => {
        // Need to be careful not to match "น้ำตกคอหมูย่าง" or "น้ำตกเสือร้องไห้" if they exist, 
        // unless the user means all of them. The user explicitly said "คอหมูย่าง เสือร้องไห้".
        // Let's use strict match or check if it's in the Grill category if needed.
        // Actually, matching the base string is fine, but I'll ensure I log what is updated.
        if (meats.some(name => item.th === name || item.th.startsWith(name))) {
            item.unit = '180g ชุด';
            console.log(`Updated unit for ${item.th} (${item.en}) to 180g ชุด`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find those grilled items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ยำแซ่บปลาหมึกยัดไส้') || item.en.toLowerCase().includes('stuffed squid')) {
            item.price = 18;
            item.unit = '3 ตัว';
            console.log(`Updated price for ${item.th} (${item.en}) to £18 and unit to 3 ตัว`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ยำแซ่บปลาหมึกยัดไส้ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        // Update Grilled Chicken & Hat Yai Fried Chicken unit to 'ตัว'
        if (item.th.includes('ไก่ย่าง') && !item.th.includes('น้ำตก')) {
            item.unit = 'ตัว';
            console.log(`Updated unit for ${item.th} (${item.en}) to ตัว`);
            updated++;
        }
        if (item.th.includes('ไก่ทอดหาดใหญ่')) {
            item.unit = 'ตัว';
            console.log(`Updated unit for ${item.th} (${item.en}) to ตัว`);
            updated++;
        }
        // Update Pineapple Fried Rice price and unit
        if (item.th.includes('ข้าวผัดสับปะรด') || item.en.toLowerCase().includes('pineapple')) {
            item.price = 18;
            item.unit = 'จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £18 and unit to จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวผัดมันกุ้ง') || item.th.includes('ข้าวผัดต้มยำกุ้ง')) {
            item.price = 16;
            item.unit = 'จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const updates = [
    { name: 'ผัดไทยกุ้ง', price: 16, unit: 'จาน' },
    { name: 'ผัดไทยไก่', price: 14, unit: 'จาน' },
    { name: 'ยำวุ้นเส้นหมูยอ', price: 16, unit: 'จาน' },
    { name: 'ยำวุ้นเส้นกุ้ง', price: 16, unit: 'จาน' }
];

data.forEach(category => {
    category.items.forEach(item => {
        updates.forEach(update => {
            if (item.th.includes(update.name)) {
                item.price = update.price;
                item.unit = update.unit;
                console.log(`Updated ${item.th} to £${update.price} and unit to ${update.unit}`);
                updated++;
            }
        });
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวหอมมะลิ') || item.en.toLowerCase().includes('jasmine rice')) {
            item.price = 7;
            item.unit = 'ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £7 and unit to ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ข้าวหอมมะลิ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const updates = [
    { keywords: ['ผัดผักรวมน้ำมันหอย', 'ผัดผักรวม', 'mixed vegetable'], price: 12, unit: 'จาน' },
    { keywords: ['ผัดผักฉ่อย', 'bok choy', 'pak choi'], price: 12, unit: 'จาน' },
    { keywords: ['หน่อไม้ฝรั่งผัด', 'asparagus'], price: 12, unit: 'จาน' },
    { keywords: ['ผัดเนื้อผักรวม', 'ผัดผักรวมเนื้อ', 'beef with mixed'], price: 18, unit: 'จาน' },
    { keywords: ['ผัดผักรวมกุ้ง', 'prawn with mixed', 'ผัดผักรวมกุ้งน้ำมันหอย'], price: 16, unit: 'จาน' }
];

data.forEach(category => {
    category.items.forEach(item => {
        // Special case to prevent overlap (e.g. "ผัดผักรวม" matching "ผัดผักรวมกุ้ง")
        if (item.th.includes('กุ้ง') || item.en.toLowerCase().includes('prawn')) {
            if (item.th.includes('ผักรวม') || item.en.toLowerCase().includes('mixed veg')) {
                item.price = 16;
                item.unit = 'จาน';
                console.log(`Updated ${item.th} to £16 and unit to จาน`);
                updated++;
            }
        } 
        else if (item.th.includes('เนื้อ') || item.en.toLowerCase().includes('beef')) {
             if (item.th.includes('ผักรวม') || item.en.toLowerCase().includes('mixed veg')) {
                item.price = 18;
                item.unit = 'จาน';
                console.log(`Updated ${item.th} to £18 and unit to จาน`);
                updated++;
             }
        }
        else if (item.th.includes('ผักฉ่อย') || item.en.toLowerCase().includes('pak choi') || item.en.toLowerCase().includes('bok choy')) {
            item.price = 12;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £12 and unit to จาน`);
            updated++;
        }
        else if (item.th.includes('หน่อไม้ฝรั่ง') || item.en.toLowerCase().includes('asparagus')) {
            item.price = 12;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £12 and unit to จาน`);
            updated++;
        }
        else if (item.th.includes('ผัดผักรวม') || item.en.toLowerCase().includes('mixed veg')) {
            // This is the plain mixed veg (not prawn, not beef)
            item.price = 12;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £12 and unit to จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('No items found.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('แกงเขียวหวานผักรวมเต้าหู้') || 
            item.th.includes('แกงแดงผักรวมเต้าหู้') || 
            item.th.includes('แกงพะแนงผักรวมเต้าหู้') || 
            item.th.includes('แกงเทโพผักรวมเต้าหู้')) {
            item.price = 14;
            item.unit = '750 กรัม 6 ถ้วย';
            console.log(`Fixed ${item.th} back to £14 and unit to 750 กรัม 6 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully fixed ${updated} items.`);
} else {
    console.log('No items needed fixing.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('เมี่ยงคำปลาซีบาส') || item.en.toLowerCase().includes('miang kham sea bass')) {
            item.price = 16;
            item.unit = '6 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £16 and unit to 6 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวเหนียวมะม่วง') || item.en.toLowerCase().includes('mango sticky rice')) {
            item.price = 7;
            item.unit = 'ชุด';
            console.log(`Updated price for ${item.th} (${item.en}) to £7 and unit to ชุด`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const cupDesserts = [
    'ลอดช่องสิงคโปร์',
    'ทับทิมกรอบ',
    'บวชชีกล้วย',
    'ขนมครองแครง',
    'บัวลอยสาคู',
    'บัวลอย 5 สี',
    'ลอดช่องอัญชัน',
    'ไอศกรีม'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวเหนียวมะม่วงน้ำดอกไม้') || item.en.toLowerCase().includes('mango sticky rice')) {
            item.price = 9.95;
            item.unit = 'จาน';
            console.log(`Updated ${item.th} to £9.95 / จาน`);
            updated++;
        } else if (cupDesserts.some(name => item.th.includes(name))) {
            item.price = 7.95;
            item.unit = 'ถ้วย';
            console.log(`Updated ${item.th} to £7.95 / ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ขนมต้มไทยโบราณ') || item.en.toLowerCase().includes('khanom tom')) {
            item.price = 12;
            item.unit = '12 ลูก/จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £12 and unit to 12 ลูก/จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ขนมต้มไทยโบราณ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ขนมต้มไทยโบราณ') || item.en.toLowerCase().includes('khanom tom')) {
            item.price = 8;
            item.unit = '2 ลูก';
            console.log(`Updated price for ${item.th} (${item.en}) to £8 and unit to 2 ลูก`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ขนมต้มไทยโบราณ in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const piecesDesserts = [
    'ขนมชั้นใบเตย',
    'ขนมชั้นอัญชัน',
    'วุ้นกะทิใบเตย',
    'วุ้นกะทิอัญชันมะพร้าวอ่อน',
    'ขนมหม้อแกง',
    'ขนมเปียกปูน'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (piecesDesserts.some(name => item.th.includes(name))) {
            item.price = 8;
            item.unit = '2 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £8 and unit to 2 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const takoDesserts = [
    'ขนมตะโก้ข้าวโพด',
    'ขนมตะโก้เผือก'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (takoDesserts.some(name => item.th.includes(name))) {
            item.price = 10;
            item.unit = '2 ชิ้น';
            console.log(`Updated price for ${item.th} (${item.en}) to £10 and unit to 2 ชิ้น`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ไอศกรีมกะทิข้าวเหนียว') || item.en.toLowerCase().includes('coconut ice cream')) {
            item.price = 7;
            item.unit = 'ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £7 and unit to ถ้วย`);
            updated++;
        } else if (item.th.includes('ไอศกรีมมะม่วงข้าวเหนียวมูน') || item.en.toLowerCase().includes('mango ice cream')) {
            item.price = 12;
            item.unit = 'ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £12 and unit to ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the ice cream items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ผลไม้รวม') || item.en.toLowerCase().includes('mixed fruit')) {
            item.price = 7.95;
            item.unit = 'จาน';
            console.log(`Updated price for ${item.th} (${item.en}) to £7.95 and unit to จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ผลไม้รวม in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const trayDesserts = [
    'ขนมชั้นใบเตย',
    'ขนมชั้นอัญชัน',
    'วุ้นกะทิใบเตย',
    'วุ้นกะทิอัญชันมะพร้าวอ่อน',
    'ขนมหม้อแกง',
    'ขนมเปียกปูน'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (trayDesserts.some(name => item.th.includes(name))) {
            item.price = 22;
            item.unit = '25 ชิ้น/ถาด';
            console.log(`Updated price for ${item.th} (${item.en}) to £22 and unit to 25 ชิ้น/ถาด`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

const takoDesserts = [
    'ขนมตะโก้ข้าวโพด',
    'ขนมตะโก้เผือก'
];

data.forEach(category => {
    category.items.forEach(item => {
        if (takoDesserts.some(name => item.th.includes(name))) {
            item.price = 25;
            item.unit = '25 ชิ้น / ถาด';
            console.log(`Updated price for ${item.th} (${item.en}) to £25 and unit to 25 ชิ้น / ถาด`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ไอศกรีมกะทิข้าวเหนียว') || item.en.toLowerCase().includes('coconut ice cream')) {
            item.price = 70;
            item.unit = '10 ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £70 and unit to 10 ถ้วย`);
            updated++;
        } else if (item.th.includes('ไอศกรีมมะม่วงข้าวเหนียวมูน') || item.en.toLowerCase().includes('mango ice cream')) {
            item.price = 80;
            item.unit = '10 ถ้วย';
            console.log(`Updated price for ${item.th} (${item.en}) to £80 and unit to 10 ถ้วย`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the ice cream items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ผลไม้รวม') || item.en.toLowerCase().includes('mixed fruit')) {
            item.price = 25;
            item.unit = 'ถาด';
            console.log(`Updated price for ${item.th} (${item.en}) to £25 and unit to ถาด`);
            updated++;
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find ผลไม้รวม in the menu.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;
let duckCurryAdded = false;

data.forEach(category => {
    if (category.id === 'curries') {
        category.items.forEach(item => {
            // Check meat types
            if (item.th.includes('หมู') || item.th.includes('ไก่')) {
                // Ignore if it has กุ้ง, เนื้อ mixed in (though unlikely)
                item.price = 40;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £40 / 3000 กรัม/หม้อ`);
                updated++;
            } else if (item.th.includes('กุ้ง') || item.th.includes('เนื้อ')) {
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £45 / 3000 กรัม/หม้อ`);
                updated++;
            } else if (item.th.includes('เต้าหู้') || item.th.includes('ผัก')) {
                item.price = 35;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £35 / 3000 กรัม/หม้อ`);
                updated++;
            }
            
            if (item.th === 'แกงเผ็ดเป็ดย่าง') {
                duckCurryAdded = true; // Already exists
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated existing แกงเผ็ดเป็ดย่าง to £45 / 3000 กรัม/หม้อ`);
                updated++;
            }
        });
        
        if (!duckCurryAdded) {
            category.items.push({
                th: "แกงเผ็ดเป็ดย่าง",
                en: "Roasted Duck Red Curry",
                price: 45,
                unit: "3000 กรัม/หม้อ",
                image: "images/roast-duck-curry.jpg",
                desc: "แกงเผ็ดเป็ดย่างพร้อมผลไม้ (Roasted duck red curry with fruits)"
            });
            console.log(`Added new item: แกงเผ็ดเป็ดย่าง £45 / 3000 กรัม/หม้อ`);
            duckCurryAdded = true;
            updated++;
        }
    }
});

if (updated > 0) {
    
    console.log(`Successfully updated/added ${updated} items.`);
} else {
    console.log('No items modified.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;
let duckCurryAdded = false;

data.forEach(category => {
    category.items.forEach(item => {
        // Find curry-like items
        if (item.th.includes('แกง') || item.th.includes('พะแนง') || item.th.includes('มัสมั่น') || item.th.includes('ต้มยำ') || item.th.includes('ต้มข่า')) {
            if (item.th.includes('หมู') || item.th.includes('ไก่')) {
                item.price = 40;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £40`);
                updated++;
            } else if (item.th.includes('กุ้ง') || item.th.includes('เนื้อ') || item.th.includes('ทะเล')) {
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £45`);
                updated++;
            } else if (item.th.includes('เต้าหู้') || item.th.includes('ผัก')) {
                item.price = 35;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated ${item.th} to £35`);
                updated++;
            }
            
            if (item.th.includes('แกงเผ็ดเป็ดย่าง')) {
                duckCurryAdded = true;
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated existing แกงเผ็ดเป็ดย่าง to £45`);
                updated++;
            }
        }
    });
});

// Add duck curry if not exists
if (!duckCurryAdded) {
    const mainsCat = data.find(c => c.id === 'mains');
    if (mainsCat) {
        mainsCat.items.push({
            id: 'item_duckcurry_' + Date.now(),
            th: "แกงเผ็ดเป็ดย่าง",
            en: "Roasted Duck Red Curry",
            img: "d4df9605-e117-4cd1-9c6a-ff5536551b9d.jpg",
            price: 45,
            unit: "3000 กรัม/หม้อ"
        });
        console.log(`Added แกงเผ็ดเป็ดย่าง to mains.`);
        updated++;
    }
}

if (updated > 0) {
    
    console.log(`Successfully updated/added items.`);
} else {
    console.log('No items modified.');
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ข้าวผัดต้มยำกุ้ง')) {
            item.price = 16;
            item.unit = 'จาน';
            console.log(`Reverted price for ${item.th} to £16 / จาน`);
            updated++;
        }
    });
});

if (updated > 0) {
    
}

})();

// --- Recovered Script ---
(() => {





let updated = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.unit && item.unit.includes('หม้อไฟ')) {
            if (item.th.includes('ปลากระพง')) {
                item.price = 45;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated price for ${item.th} to £45 and unit to 3000 กรัม/หม้อ`);
                updated++;
            } else if (item.th.includes('ปลาหมึก')) {
                item.price = 50;
                item.unit = '3000 กรัม/หม้อ';
                console.log(`Updated price for ${item.th} to £50 and unit to 3000 กรัม/หม้อ`);
                updated++;
            }
        }
    });
});

if (updated > 0) {
    
    console.log(`Successfully updated ${updated} items.`);
} else {
    console.log('Could not find the items in the menu.');
}

})();

// --- Recovered Script ---
(() => {





const exactMatches = [
    'ส้มตำไทย',
    'ยำส้มโอกุ้งสด',
    'เมี่ยงคำปลาซีบาส',
    'แซลมอนลุยสวนเกี๊ยวกรอบ',
    'เมี่ยงคำส้มโอกุ้ง',
    'ข้าวเกรียบปากหม้อ'
];

const includesMatches = [
    'ลาบไก่',
    'ลาบหมู'
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        let match = false;
        
        // Exact match (or mostly exact)
        if (exactMatches.some(t => item.th.includes(t))) {
            match = true;
        }
        
        // Includes match
        if (includesMatches.some(t => item.th.includes(t))) {
            match = true;
        }
        
        if (match) {
            item.unit = "12 ชิ้น";
            updatedCount++;
            console.log('Updated:', item.th);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const exactMatches = [
    'ส้มตำไทย',
    'ยำส้มโอกุ้งสด',
    'เมี่ยงคำปลาซีบาส',
    'แซลมอนลุยสวนเกี๊ยวกรอบ',
    'เมี่ยงคำส้มโอกุ้ง',
    'ข้าวเกรียบปากหม้อ'
];

const includesMatches = [
    'ลาบไก่',
    'ลาบหมู',
    'ลาบ' // Fallback just in case
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        let match = false;
        
        if (exactMatches.some(t => item.th.includes(t))) {
            match = true;
        }
        
        if (includesMatches.some(t => item.th.includes(t)) && category.id === 'starters') { // Ensure we only hit starters/salads for "Larb"
             match = true;
        }
        
        if (match) {
            item.unit = "12 ชิ้น";
            updatedCount++;
            console.log('Updated:', item.th);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const targets = [
    'หมูสะเต๊ะ',
    'หมูปิ้งนมสด',
    'ไก่สะเต๊ะ'
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (targets.some(t => item.th.includes(t))) {
            item.price = 12;
            item.unit = "12 ไม้";
            updatedCount++;
            console.log('Updated:', item.th, 'to £12 / 12 ไม้');
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const targets = [
    'ถุงทอง',
    'กุ้งห่มสไบ',
    'ทอดมันกุ้ง',
    'ม้าฮ่อ',
    'ปอเปี๊ยะกุ้งทอด',
    'ปอเปี๊ยะสดเห็ดเข็มทอง'
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (targets.some(t => item.th.includes(t))) {
            item.unit = "12 ชิ้น";
            updatedCount++;
            console.log('Updated:', item.th, 'to 12 ชิ้น');
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const targets = ['กุ้งทอดซอสมะขาม'];
let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (targets.some(t => item.th.includes(t))) {
            item.unit = "12 ชิ้น";
            updatedCount++;
            console.log('Updated:', item.th, 'to 12 ชิ้น');
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const updates = [
    { name: 'ปลาหมึกผัดพริกเผา', price: 35 },
    { name: 'ผัดฉ่าปลากระพง', price: 35 },
    { name: 'ผัดเผ็ดปลากระพง', price: 35 },
    { name: 'ผัดเผ็ดกุ้ง', price: 35 },
    { name: 'ผัดเผ็ดหมู', price: 25 },
    { name: 'ผัดเผ็ดไก่', price: 25 },
    { name: 'ผัดเผ็ดเนื้อ', price: 30 },
    { name: 'ผัดเปรี้ยวหวานไก่', price: 25 },
    { name: 'ผัดเปรี้ยวหวานปลากระพง', price: 35 },
    { name: 'ไก่ผัดขิง', price: 25 }
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const target = updates.find(u => item.th.includes(u.name));
        if (target) {
            item.price = target.price;
            item.unit = "2000 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / 2000 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const updates = [
    { name: 'น้ำพริกอ่อง', price: 25 },
    { name: 'น้ำพริกหนุ่ม', price: 25 },
    { name: 'น้ำพริกกะปิ', price: 35 }
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const target = updates.find(u => item.th.includes(u.name));
        if (target) {
            item.price = target.price;
            item.unit = "2000 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / 2000 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const updates = [
    { name: 'คอหมูย่าง', price: 35 },
    { name: 'เสือร้องไห้', price: 45 }
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const target = updates.find(u => item.th.includes(u.name));
        if (target) {
            item.price = target.price;
            item.unit = "1500 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / 1500 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const updates = [
    { name: 'พล่าปลาแซลมอน', price: 65 }
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const target = updates.find(u => item.th.includes(u.name));
        if (target) {
            item.price = target.price;
            item.unit = "1000 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / 1000 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const targets = [
    'ปลาหมึกผัดพริกเผา',
    'ผัดฉ่าปลากระพง',
    'ผัดเผ็ดปลากระพง',
    'ผัดเผ็ดกุ้ง',
    'ผัดเผ็ดหมู',
    'ผัดเผ็ดไก่',
    'ผัดเผ็ดเนื้อ',
    'ผัดเปรี้ยวหวานไก่',
    'ผัดเปรี้ยวหวานปลากระพง',
    'ไก่ผัดขิง'
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (targets.some(t => item.th.includes(t))) {
            item.unit = "1000 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to 1000 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {





const updates = [
    { name: 'พล่ากุ้ง', price: 35 }
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const target = updates.find(u => item.th.includes(u.name));
        if (target) {
            item.price = target.price;
            item.unit = "1000 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / 1000 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);
})();

// --- Recovered Script ---
(() => {





const updates = [
    { name: 'ผัดเผ็ดเนื้อ', price: 35 }
];

let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        const target = updates.find(u => item.th.includes(u.name));
        if (target) {
            item.price = target.price;
            item.unit = "1000 กรัม";
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / 1000 กรัม`);
        }
    });
});


console.log('Total updated:', updatedCount);

})();

// --- Recovered Script ---
(() => {




let updated = false;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === "ข้าวผัดมันปู") {
            item.price = 65;
            updated = true;
            console.log('Updated ข้าวผัดมันปู to £65');
        }
    });
});

if (updated) {
    
} else {
    console.log('Item not found');
}
})();

// --- Recovered Script ---
(() => {


function updateMenuImage(filePath) {
    if (fs.existsSync(filePath)) {
        
        let updated = false;
        
        data.forEach(category => {
            category.items.forEach(item => {
                if (item.th && item.th.includes('เป็ดย่าง')) {
                    item.img = "red_curry_duck.jpg";
                    updated = true;
                    console.log(`Updated image in ${filePath} for: ${item.th}`);
                }
            });
        });

        if (updated) {
            
        }
    }
}

updateMenuImage('data/buffet_menu.json');
updateMenuImage('data/classic_menu.json');
updateMenuImage('data/menu.json');

})();

// --- Recovered Script ---
(() => {




data.forEach(category => {
    if (category.id === 'rice') {
        // Filter out old duplicates
        category.items = category.items.filter(item => {
            if (item.th === 'ข้าวผัดสับปะรด' && item.price === 18) return false;
            if (item.th === 'ข้าวผัดมันกุ้ง' && item.price === 16) return false;
            if (item.th === 'ข้าวผัดต้มยำกุ้ง' && item.price === 16) return false;
            return true;
        });
        
        // Update unit to '2000 กรัม / ถาด' for the new rice dishes
        category.items.forEach(item => {
            if (item.price >= 25 && item.unit && item.unit.includes('2000 กรัม')) {
                item.unit = '2000 กรัม / ถาด';
                console.log('Updated unit for:', item.th);
            }
        });
    }
});


console.log('Fixed duplicate rice items and updated units.');
})();

// --- Recovered Script ---
(() => {




let updated = 0;
data.forEach(category => {
    if (category.id === 'rice') {
        category.items.forEach(item => {
            if (item.th === 'ข้าวผัดสับปะรด') { item.img = 'pineapple_fried_rice.jpg'; updated++; }
            if (item.th === 'ข้าวผัดมันกุ้ง') { item.img = 'shrimp_paste_fried_rice.jpg'; updated++; }
            if (item.th === 'ข้าวผัดต้มยำกุ้ง') { item.img = 'tom_yum_goong_fried_rice.jpg'; updated++; }
        });
    }
});


console.log('Updated ' + updated + ' images.');
})();

// --- Recovered Script ---
(() => {




let updated = 0;
data.forEach(category => {
    if (category.id === 'rice') {
        category.items.forEach(item => {
            if (item.th === 'ข้าวผัดมันปู') { item.img = 'crab_paste_fried_rice.jpg'; updated++; }
            if (item.th === 'ข้าวผัดปู') { item.img = 'crab_fried_rice.jpg'; updated++; }
        });
    }
});


console.log('Updated ' + updated + ' images.');
})();

// --- Recovered Script ---
(() => {




let updated = 0;
data.forEach(category => {
    if (category.id === 'rice') {
        category.items.forEach(item => {
            if (item.th === 'ข้าวผัดกุ้ง') { 
                item.img = 'prawn_fried_rice.jpg'; 
                updated++; 
            }
        });
    }
});


console.log('Updated ' + updated + ' images.');
})();

// --- Recovered Script ---
(() => {




let updated = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.en === 'Stir-fried Crab Meat in Yellow Curry' || item.th === 'เนื้อปูผัดผงกะหรี่') {
            item.en = 'Crab Meat Curry';
            updated = true;
            console.log('Updated English name to Crab Meat Curry');
        }
    });
});

if (updated) {
    
} else {
    console.log('Item not found');
}
})();

// --- Recovered Script ---
(() => {




let updated = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'เนื้อปูผัดผงกะหรี่') {
            item.img = 'crab_meat_curry.jpg';
            updated = true;
            console.log('Updated image for Crab Meat Curry');
        }
    });
});

if (updated) {
    
}
})();

// --- Recovered Script ---
(() => {




let updated = false;
data.forEach(category => {
    category.items.forEach(item => {
        if (item.th === 'ข้าวผัดไก่') {
            item.img = 'chicken_fried_rice.jpg';
            updated = true;
            console.log('Updated image for Chicken Fried Rice');
        }
    });
});

if (updated) {
    
}
})();

// --- Recovered Script ---
(() => {




let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        // 1. Jasmine Rice
        if (item.th === 'ข้าวหอมมะลิ') {
            item.price = 15;
            item.unit = 'โถ';
            updatedCount++;
            console.log('Updated: ข้าวหอมมะลิ to £15 / โถ');
        }
        
        // 2. Pad Thai
        if (item.th.includes('ผัดไทย')) {
            if (item.th.includes('กุ้ง')) {
                item.price = 35;
                item.unit = '2000 กรัม / ถาด';
            } else if (item.th.includes('ไก่')) {
                item.price = 25;
                item.unit = '2000 กรัม / ถาด';
            } else if (item.th.includes('ผัก')) {
                item.price = 20;
                item.unit = '2000 กรัม / ถาด';
            }
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / ${item.unit}`);
        }
        
        // 3. Glass Noodle Salads (ยำวุ้นเส้น)
        if (item.th.includes('ยำวุ้นเส้น')) {
            if (item.th.includes('กุ้ง')) {
                item.price = 35;
                item.unit = '2000 กรัม / ถาด';
            } else if (item.th.includes('หมูยอ')) {
                item.price = 35;
                item.unit = '2000 กรัม / ถาด';
            }
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / ${item.unit}`);
        }
    });
});

if (updatedCount > 0) {
    
}
console.log('Total items updated:', updatedCount);
})();

// --- Recovered Script ---
(() => {




let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('น้ำพริก')) {
            item.unit = '750 กรัม';
            updatedCount++;
            console.log(`Updated: ${item.th} to unit 750 กรัม`);
        }
    });
});

if (updatedCount > 0) {
    
}
console.log('Total items updated:', updatedCount);
})();

// --- Recovered Script ---
(() => {




let updatedCount = 0;

data.forEach(category => {
    if (category.id === 'vegetables') {
        category.items.forEach(item => {
            if (item.th.includes('กุ้ง')) {
                item.price = 45;
            } else if (item.th.includes('เนื้อ')) {
                item.price = 35;
            } else {
                item.price = 25;
            }
            item.unit = 'ถาด';
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / ${item.unit}`);
        });
    }
});

if (updatedCount > 0) {
    
}
console.log('Total vegetable items updated:', updatedCount);
})();

// --- Recovered Script ---
(() => {




let updatedCount = 0;

data.forEach(category => {
    category.items.forEach(item => {
        if (item.th.includes('ขนมต้มไทยโบราณ')) {
            item.price = 22;
            item.unit = '25 ชิ้น / ถาด';
            updatedCount++;
            console.log(`Updated: ${item.th} to £${item.price} / ${item.unit}`);
        }
    });
});

if (updatedCount > 0) {
    
}
console.log('Total items updated:', updatedCount);
})();

// --- Recovered Script ---
(() => {



const desktopImgDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\images';
const repoImgDir = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\images';


const imagesFound = [
    'Blue Lemon Soda.jpg',
    'CoffeeHoney Lemon SODA.jpg',
    'Green tea honey Lemon SODA.jpg',
    'Ice black tea.jpg',
    'Red Honey Soda.jpg',
    'Strawberry Peach Soda.jpg',
    'Thai milk tea.jpg'
];

const nameMapping = {
    "บลูเลมอนโซดา": "Blue Lemon Soda.jpg",
    "กาแฟน้ำผึ้งมะนาวโซดา": "CoffeeHoney Lemon SODA.jpg",
    "ชาเขียวน้ำผึ้งมะนาวโซดา": "Green tea honey Lemon SODA.jpg",
    "ชาดำเย็น": "Ice black tea.jpg",
    "แดงสละน้ำผึ้งโซดา": "Red Honey Soda.jpg",
    "สตรอว์เบอร์รีพีชโซดา": "Strawberry Peach Soda.jpg",
    "ชาไทยเย็น": "Thai milk tea.jpg"
};

// Copy and rename files
for (const originalName of imagesFound) {
    const safeName = originalName.replace(/ /g, '_').toLowerCase();
    const srcPath = path.join(desktopImgDir, originalName);
    const destPath = path.join(repoImgDir, safeName);
    try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${safeName}`);
    } catch (e) {
        console.log(`Error copying ${originalName}: ${e.message}`);
    }
}

// Update JSON

data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.forEach(item => {
            const originalName = nameMapping[item.th];
            if (originalName) {
                item.img = originalName.replace(/ /g, '_').toLowerCase();
                console.log(`Updated link for ${item.th} -> ${item.img}`);
            }
        });
    }
});


console.log('Done!');
})();

// --- Recovered Script ---
(() => {



const desktopImgDir = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\images';
const repoImgDir = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\images';


const imagesFound = [
    'Peach Honey Lemon Soda.jpg',
    'pink orange soda.jpg'
];

const nameMapping = {
    "พีชน้ำผึ้งมะนาวโซดา": "Peach Honey Lemon Soda.jpg",
    "พิงค์ออเรนจ์โซดา": "pink orange soda.jpg"
};

for (const originalName of imagesFound) {
    const safeName = originalName.replace(/ /g, '_').toLowerCase();
    const srcPath = path.join(desktopImgDir, originalName);
    const destPath = path.join(repoImgDir, safeName);
    try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${safeName}`);
    } catch (e) {
        console.log(`Error copying ${originalName}: ${e.message}`);
    }
}


data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.forEach(item => {
            const originalName = nameMapping[item.th];
            if (originalName) {
                item.img = originalName.replace(/ /g, '_').toLowerCase();
                console.log(`Updated link for ${item.th} -> ${item.img}`);
            }
        });
    }
});


console.log('Done!');
})();

// --- Recovered Script ---
(() => {




data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.forEach(item => {
            item.price = 9;
        });
    }
});


console.log('Drink prices updated to 9');
})();

// --- Recovered Script ---
(() => {




data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.forEach(item => {
            item.price = 45;
            item.unit = 'เหยือก (1.5L)';
        });
    }
});


console.log('Drinks updated to 1.5L and 45');
})();

// --- Recovered Script ---
(() => {




data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.forEach(item => {
            item.price = 75;
            item.unit = 'เหยือก (2.5L)';
        });
    }
});


console.log('Drinks updated to 2.5L and 75');
})();

// --- Recovered Script ---
(() => {




data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.push({
            id: `drink_${category.items.length + 1}`,
            th: "น้ำส้มคั้น",
            en: "Fresh Orange Juice",
            price: 75,
            unit: 'เหยือก (2.5L)',
            img: "logo.png"
        });
    }
});


console.log('Added orange juice');
})();

// --- Recovered Script ---
(() => {



const srcPath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\images\\Fresh Orange Juice.jpg';
const destPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\images\\fresh_orange_juice.jpg';


try {
    fs.copyFileSync(srcPath, destPath);
    console.log('Copied fresh_orange_juice.jpg');
} catch (e) {
    console.error('Copy error:', e.message);
}



data.forEach(category => {
    if (category.id === 'drinks') {
        category.items.forEach(item => {
            if (item.th === 'น้ำส้มคั้น') {
                item.img = 'fresh_orange_juice.jpg';
            }
        });
    }
});


console.log('Updated JSON');
})();

fs.writeFileSync(path1, JSON.stringify(data, null, 4), 'utf8');
fs.writeFileSync(path2, JSON.stringify(data, null, 4), 'utf8');
console.log('Master recovery script complete!');
