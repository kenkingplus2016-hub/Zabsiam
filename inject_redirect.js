const fs = require('fs');

function injectRedirect(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Replace closeModal(); with closeModal(); window.location.href = 'booking.html';
    
    // For main block
    const oldCode1 = `addToCart({
                            id: \`classic-\${set.id}\`,
                            name_th: set.name && set.name.th ? set.name.th : set.name_th,
                            name_en: set.name && set.name.en ? set.name.en : set.name_en,
                            price: parseFloat(set.price),
                            qty: parseInt(qty),
                            category: 'Classic',
                            unit_th: (set.unit && set.unit.th) ? set.unit.th : 'ชุด',
                            unit_en: (set.unit && set.unit.en) ? set.unit.en : 'Set',
                            options: customChoicesArr
                        });
                        closeModal();`;
                        
    const newCode1 = `addToCart({
                            id: \`classic-\${set.id}\`,
                            name_th: set.name && set.name.th ? set.name.th : set.name_th,
                            name_en: set.name && set.name.en ? set.name.en : set.name_en,
                            price: parseFloat(set.price),
                            qty: parseInt(qty),
                            category: 'Classic',
                            unit_th: (set.unit && set.unit.th) ? set.unit.th : 'ชุด',
                            unit_en: (set.unit && set.unit.en) ? set.unit.en : 'Set',
                            options: customChoicesArr
                        });
                        closeModal();
                        window.location.href = 'booking.html';`;

    // For else block
    const oldCode2 = `addToCart({
                            id: \`classic-\${set.id}\`,
                            name_th: set.name && set.name.th ? set.name.th : set.name_th,
                            name_en: set.name && set.name.en ? set.name.en : set.name_en,
                            price: parseFloat(set.price),
                            qty: qty,
                            category: "Classic",
                            unit_th: (set.unit && set.unit.th) ? set.unit.th : "กล่อง",
                            unit_en: (set.unit && set.unit.en) ? set.unit.en : "Box"
                        });
                        closeModal();`;
                        
    const newCode2 = `addToCart({
                            id: \`classic-\${set.id}\`,
                            name_th: set.name && set.name.th ? set.name.th : set.name_th,
                            name_en: set.name && set.name.en ? set.name.en : set.name_en,
                            price: parseFloat(set.price),
                            qty: qty,
                            category: "Classic",
                            unit_th: (set.unit && set.unit.th) ? set.unit.th : "กล่อง",
                            unit_en: (set.unit && set.unit.en) ? set.unit.en : "Box"
                        });
                        closeModal();
                        window.location.href = 'booking.html';`;

    let changed = false;
    if (content.includes(oldCode1)) {
        content = content.replace(oldCode1, newCode1);
        changed = true;
    }
    if (content.includes(oldCode2)) {
        content = content.replace(oldCode2, newCode2);
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log("Injected redirect in " + file);
    }
}

injectRedirect('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/delivery.html');
injectRedirect('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html');
