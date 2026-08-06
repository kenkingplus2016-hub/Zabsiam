const fs = require('fs');

const htmlFiles = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

const funcText = `function generateNutrition(item) {
    const en = (item.en || '').toLowerCase();
    const th = (item.th || '').toLowerCase();
    
    // Default multiplier (Chicken / Prawn)
    let mult = 1.0;
    if (th.includes('เนื้อ') || en.includes('beef') || th.includes('หมู') || en.includes('pork') || th.includes('เป็ด') || en.includes('duck')) {
        mult = 1.2; // 20% more calories/fat
    } else if (th.includes('ผัก') || th.includes('เต้าหู้') || en.includes('veg') || en.includes('tofu')) {
        mult = 0.8; // 20% less calories/fat
    }
    
    // Base values per 100g
    let base = {
        kJ: 494 * mult,
        cal: 118 * mult,
        protein: 11.1 * mult,
        carb: 4.8,
        sugars: 3.1,
        fat: 6.3 * mult,
        satFat: 4.27 * mult,
        fibre: 1.0 * (mult === 0.8 ? 1.5 : 1.0),
        sodium: 0.34,
        salt: 0.85
    };
    
    let portion = 2.6; // multiplier for ~260g portion

    return \`
    <div class="overflow-hidden rounded-lg border border-gray-200">
        <table class="w-full text-[14px] text-left text-gray-600">
            <thead class="text-gray-800 bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold">
                <tr>
                    <th class="py-2.5 px-3">Typical Values</th>
                    <th class="py-2.5 px-3 text-right">Per 100g</th>
                    <th class="py-2.5 px-3 text-right">Per Portion</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-gray-50"><td class="py-2 px-3 font-medium text-gray-800">Energy (kJ)</td><td class="py-2 px-3 text-right">\${Math.round(base.kJ)}</td><td class="py-2 px-3 text-right">\${Math.round(base.kJ * portion)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3 font-medium text-gray-800">Energy (cal)</td><td class="py-2 px-3 text-right">\${Math.round(base.cal)}</td><td class="py-2 px-3 text-right">\${Math.round(base.cal * portion)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3">Protein (g)</td><td class="py-2 px-3 text-right">\${base.protein.toFixed(1)}</td><td class="py-2 px-3 text-right">\${(base.protein * portion).toFixed(1)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3">Carbohydrate (g)</td><td class="py-2 px-3 text-right">\${base.carb.toFixed(1)}</td><td class="py-2 px-3 text-right">\${(base.carb * portion).toFixed(1)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-1 px-3 pl-6 text-gray-500 text-xs">of which: sugars (g)</td><td class="py-1 px-3 text-right text-gray-500">\${base.sugars.toFixed(1)}</td><td class="py-1 px-3 text-right text-gray-500">\${(base.sugars * portion).toFixed(1)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3">Fat (g)</td><td class="py-2 px-3 text-right">\${base.fat.toFixed(1)}</td><td class="py-2 px-3 text-right">\${(base.fat * portion).toFixed(1)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-1 px-3 pl-6 text-gray-500 text-xs">of which are saturates (g)</td><td class="py-1 px-3 text-right text-gray-500">\${base.satFat.toFixed(2)}</td><td class="py-1 px-3 text-right text-gray-500">\${(base.satFat * portion).toFixed(2)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3">Fibre (g)</td><td class="py-2 px-3 text-right">\${base.fibre.toFixed(1)}</td><td class="py-2 px-3 text-right">\${(base.fibre * portion).toFixed(1)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3">Sodium (g)</td><td class="py-2 px-3 text-right">\${base.sodium.toFixed(2)}</td><td class="py-2 px-3 text-right">\${(base.sodium * portion).toFixed(2)}</td></tr>
                <tr class="hover:bg-gray-50"><td class="py-2 px-3">Salt (g)</td><td class="py-2 px-3 text-right">\${base.salt.toFixed(2)}</td><td class="py-2 px-3 text-right">\${(base.salt * portion).toFixed(2)}</td></tr>
            </tbody>
        </table>
    </div>
    \`;
}

function generateIngredients(item) {`;

for (let file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        if (!content.includes('function generateNutrition(item)')) {
            content = content.replace('function generateIngredients(item) {', funcText);
            
            // Inject call inside modal
            content = content.replace("document.getElementById('acc-ingredients').innerHTML = generateIngredients(item);", "document.getElementById('acc-ingredients').innerHTML = generateIngredients(item);\n            document.getElementById('acc-nutrition').innerHTML = generateNutrition(item);");
            
            fs.writeFileSync(file, content, 'utf8');
            console.log('Injected nutrition logic into ' + file);
        } else {
            console.log('Already injected in ' + file);
        }
    }
}
