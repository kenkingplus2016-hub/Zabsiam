const fs = require('fs');

function injectTryCatch(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Replace addToCart blocks with a try catch to see the error
    const oldCode = `addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name.th || set.name_th,
                        name_en: set.name.en || set.name_en,
                        price: parseFloat(set.price),
                        qty: parseInt(qty),
                        category: 'Classic',
                        unit_th: set.unit?.th || 'ชุด',
                        unit_en: set.unit?.en || 'Set',
                        options: customChoicesArr
                    });
                    closeModal();`;
    
    const newCode = `try {
                        addToCart({
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
                    } catch (err) {
                        alert("Error adding to cart: " + err.message + "\\n" + err.stack);
                    }`;

    if (content.includes(oldCode)) {
        content = content.replace(oldCode, newCode);
        console.log("Injected try/catch in " + file);
    }
    
    const oldElseCode = `addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name?.th || set.name_th,
                        name_en: set.name?.en || set.name_en,
                        price: parseFloat(set.price),
                        qty: qty,
                        category: "Classic",
                        unit_th: set.unit?.th || set.unit_th || "กล่อง",
                        unit_en: set.unit?.en || set.unit_en || "Box"
                    });
                    closeModal();`;
                    
    const newElseCode = `try {
                        addToCart({
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
                    } catch (err) {
                        alert("Error adding to cart (else): " + err.message + "\\n" + err.stack);
                    }`;
                    
    if (content.includes(oldElseCode)) {
        content = content.replace(oldElseCode, newElseCode);
        console.log("Injected try/catch (else) in " + file);
    }

    fs.writeFileSync(file, content);
}

injectTryCatch('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/delivery.html');
injectTryCatch('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html');
