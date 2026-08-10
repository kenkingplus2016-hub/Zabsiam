const fs = require('fs');
const htmlFile = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html';
const destFile = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html';

let html = fs.readFileSync(htmlFile, 'utf8');

const targetRegex = /filteredItems\.forEach\(item => \{\s*const imgSrc =[\s\S]*?const hoverImgSrc =[\s\S]*?;\s*html \+= `/;
const replacement = `filteredItems.forEach(item => {
                    const imgSrc = item.img === 'logo.png' ? 'logo.png' : (item.img.startsWith('http') ? item.img : \`images/\${item.img}\`);
                    const unit = item.unit || 'Portion';
                    // Check if there is a hover image in data, otherwise use the same image but keep the zoom effect
                    const hasHoverImg = !!item.img_hover;
                    const hoverImgSrc = hasHoverImg ? (item.img_hover.startsWith('http') ? item.img_hover : \`images/\${item.img_hover}\`) : imgSrc;
                    
                    const p1 = item.price_s1 || item.price;
                    const p2 = item.price_s2 || (item.price * 1.7);
                    const w1 = item.weight_s1 || '250g';
                    const w2 = item.weight_s2 || '500g';
                    
                    html += \``;

html = html.replace(targetRegex, replacement);

const priceRegex = /<div class="flex flex-col items-center w-1\/2 px-1">\s*<p class="font-bold text-gray-800 text-lg mb-1">\$\{item\.price\.toFixed\(2\)\}<\/p>\s*<p class="text-\[11px\] font-semibold text-gray-800 mb-2">Serves 1 <span class="font-normal text-gray-500">\(250g\)<\/span><\/p>\s*<button onclick="addBuffetItem\('\$\{item\.id\}_s1', '\$\{item\.en\} \(Serves 1\)', \$\{item\.price\}, '\$\{imgSrc\}'\)" class="w-full bg-\[#3F7283\] text-white py-1\.5 rounded text-sm font-bold hover:bg-\[#2c5361\] transition-colors">\s*Add\s*<\/button>\s*<\/div>\s*<!-- Serves 2 Column -->\s*<div class="flex flex-col items-center w-1\/2 px-1">\s*<p class="font-bold text-gray-800 text-lg mb-1">\$\{\(item\.price \* 1\.7\)\.toFixed\(2\)\}<\/p>\s*<p class="text-\[11px\] font-semibold text-gray-800 mb-2">Serves 2 <span class="font-normal text-gray-500">\(500g\)<\/span><\/p>\s*<button onclick="addBuffetItem\('\$\{item\.id\}_s2', '\$\{item\.en\} \(Serves 2\)', \$\{item\.price \* 1\.7\}, '\$\{imgSrc\}'\)" class="w-full bg-\[#3F7283\] text-white py-1\.5 rounded text-sm font-bold hover:bg-\[#2c5361\] transition-colors">\s*Add\s*<\/button>\s*<\/div>/;

const newPriceLogic = `<div class="flex flex-col items-center w-1/2 px-1">
                                            <p class="font-bold text-gray-800 text-lg mb-1">£\${p1.toFixed(2)}</p>
                                            <p class="text-[11px] font-semibold text-gray-800 mb-2">Serves 1 <span class="font-normal text-gray-500">(\${w1})</span></p>
                                            <button onclick="addBuffetItem('\${item.id}_s1', '\${item.en} (Serves 1)', \${p1}, '\${imgSrc}')" class="w-full bg-[#3F7283] text-white py-1.5 rounded text-sm font-bold hover:bg-[#2c5361] transition-colors">
                                                Add
                                            </button>
                                        </div>
                                        
                                        <!-- Serves 2 Column -->
                                        <div class="flex flex-col items-center w-1/2 px-1">
                                            <p class="font-bold text-gray-800 text-lg mb-1">£\${p2.toFixed(2)}</p>
                                            <p class="text-[11px] font-semibold text-gray-800 mb-2">Serves 2 <span class="font-normal text-gray-500">(\${w2})</span></p>
                                            <button onclick="addBuffetItem('\${item.id}_s2', '\${item.en} (Serves 2)', \${p2}, '\${imgSrc}')" class="w-full bg-[#3F7283] text-white py-1.5 rounded text-sm font-bold hover:bg-[#2c5361] transition-colors">
                                                Add
                                            </button>
                                        </div>`;

html = html.replace(priceRegex, newPriceLogic);

fs.writeFileSync(htmlFile, html, 'utf8');
if (fs.existsSync(destFile)) {
    fs.writeFileSync(destFile, html, 'utf8');
}
console.log("Fixed grid prices!");
