const fs = require('fs');

const htmlFiles = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

const funcText = `function generateIngredients(item) {
    const en = (item.en || '').toLowerCase();
    const th = (item.th || '').toLowerCase();
    
    // Check if it's a curry
    let isCurry = th.includes('แกง') || th.includes('พะแนง') || th.includes('เทโพ') || 
                  th.includes('มัสมั่น') || th.includes('เขียวหวาน') || th.includes('ต้มยำ') || 
                  th.includes('ต้มข่า') || en.includes('curry') || en.includes('tom yum') || 
                  en.includes('tom kha');
                  
    if (!isCurry) {
        return 'Authentic Thai ingredients. See packaging for full list.';
    }
    
    // Meat detection
    let meat = 'Chicken';
    let sauce = 'Thai Fish Sauce';
    
    if (th.includes('กุ้ง') || en.includes('prawn') || en.includes('shrimp')) meat = 'Prawns';
    else if (th.includes('เนื้อ') || en.includes('beef')) meat = 'Beef';
    else if (th.includes('หมู') || en.includes('pork')) meat = 'Pork';
    else if (th.includes('ปลา') || en.includes('fish') || en.includes('bass')) meat = 'Sea Bass';
    else if (th.includes('เป็ด') || en.includes('duck')) meat = 'Roasted Duck';
    else if (th.includes('ผัก') || th.includes('เต้าหู้') || en.includes('veg') || en.includes('tofu')) {
        meat = 'Mixed Vegetables & Tofu';
        sauce = 'Soy Sauce';
    }
    
    // Curry Paste detection
    let curryType = 'Thai';
    let pasteIngredients = 'Spices, Chilli, Lemongrass, Salt, Garlic, Onion, Galangal, Kaffir Lime Peel';
    
    if (th.includes('เขียวหวาน') || en.includes('green curry')) {
        curryType = 'Thai Green';
        pasteIngredients = 'Green Chilli, Lemongrass, Salt, Garlic, Onion, Galangal, Kaffir Lime Peel, Spices';
    } else if (th.includes('แดง') || th.includes('เผ็ด') || th.includes('เทโพ') || en.includes('red curry')) {
        curryType = 'Thai Red';
        pasteIngredients = 'Dried Red Chilli, Lemongrass, Salt, Garlic, Onion, Galangal, Kaffir Lime Peel, Spices';
    } else if (th.includes('พะแนง') || en.includes('panang')) {
        curryType = 'Thai Panang';
        pasteIngredients = 'Dried Red Chilli, Lemongrass, Salt, Garlic, Onion, Galangal, Kaffir Lime Peel, Spices, Peanuts';
    } else if (th.includes('มัสมั่น') || en.includes('massaman')) {
        curryType = 'Thai Massaman';
        pasteIngredients = 'Dried Red Chilli, Lemongrass, Salt, Garlic, Onion, Galangal, Kaffir Lime Peel, Spices, Cardamom, Cinnamon';
    } else if (th.includes('ต้มยำ') || en.includes('tom yum')) {
        curryType = 'Tom Yum';
        pasteIngredients = 'Lemongrass, Galangal, Kaffir Lime Leaves, Chilli, Lime Juice';
    }
    
    const vegetable = curryType === 'Thai Green' ? 'Green Peppers' : 'Mixed Vegetables';
    
    return \`<b>AT COOK WE USE THE SAME INGREDIENTS YOU WOULD USE AT HOME.</b><br><br>We never put additives or preservatives into our food. We do occasionally use kitchen cupboard ingredients that include some additives in their sub-ingredients (for example some of our curry pastes, which contain Citric Acid).<br><br>\${meat} (39%), Coconut Milk (21%) (Water, Coconut Extract), \${vegetable} (15%), Palm Sugar, \${sauce}, Rapeseed Oil, \${curryType} Curry Paste (\${pasteIngredients}), Coriander, Ginger Puree, Salt.\`;
}

        window.openProductModal = function(itemId) {`;

for (let file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Only inject if not already injected
        if (!content.includes('function generateIngredients(item)')) {
            content = content.replace('window.openProductModal = function(itemId) {', funcText);
            
            // Inject call inside modal
            content = content.replace('// Prices & Weights & Add functions', "document.getElementById('acc-ingredients').innerHTML = generateIngredients(item);\n            // Prices & Weights & Add functions");
            
            fs.writeFileSync(file, content, 'utf8');
            console.log('Injected ingredients logic into ' + file);
        } else {
            console.log('Already injected in ' + file);
        }
    }
}
