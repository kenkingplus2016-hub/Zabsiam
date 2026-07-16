const fs = require('fs');

function fixElseBlock(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    const oldBlock = `addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name_th,
                        name_en: set.name_en,
                        price: set.price,
                        qty: qty,
                        category: "Classic",
                        unit_th: set.unit_th || "กล่อง",
                        unit_en: set.unit_en || "Box"
                    });`;
    
    const newBlock = `addToCart({
                        id: \`classic-\${set.id}\`,
                        name_th: set.name?.th || set.name_th,
                        name_en: set.name?.en || set.name_en,
                        price: parseFloat(set.price),
                        qty: qty,
                        category: "Classic",
                        unit_th: set.unit?.th || set.unit_th || "กล่อง",
                        unit_en: set.unit?.en || set.unit_en || "Box"
                    });`;
    
    if (content.includes(oldBlock)) {
        content = content.replace(oldBlock, newBlock);
        fs.writeFileSync(file, content);
        console.log("Fixed else block in " + file);
    }
}

fixElseBlock('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/delivery.html');
fixElseBlock('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/desserts.html');
