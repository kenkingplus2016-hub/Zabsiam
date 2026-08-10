const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html';
const gitPath = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html';

let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Add button logic in product modal
content = content.replace(/const p1 = item\.price_s1[\s\S]*?document\.getElementById\('modal-add-4'\)\.onclick = .*?;\s*/g, '');

// 2. Remove price elements from product modal HTML
content = content.replace(/<div class="flex justify-between border-t border-gray-100 pt-4 mt-4 relative">[\s\S]*?<\/div>\s*<\/div>\s*<!-- End Pricing Columns -->/, '');

// 3. Remove "Serves 1" and "Serves 2" and Add buttons from renderGrid
const renderGridReplace = `<div class="mt-auto">
                                    <div class="flex justify-between border-t border-gray-100 pt-3 relative">
                                        <!-- Vertical divider -->
                                        <div class="absolute left-1/2 top-3 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>
                                        
                                        <!-- Serves 1 Column -->
                                        <div class="flex flex-col items-center w-1/2 px-1">
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
                                        </div>
                                    </div>
                                </div>`;

// Replace it with just a simple price tag
content = content.replace(renderGridReplace, `<div class="mt-auto pt-3 border-t border-gray-100">
                                    <p class="font-bold text-[#e65c00] text-lg text-center">£\${p1.toFixed(2)}</p>
                                </div>`);


// 4. Also remove any hardcoded pricing columns in the modal HTML if I missed it
// Actually I'll just find `<div class="flex justify-between border-t border-gray-100 pt-4 mt-4 relative">`
content = content.replace(/<div class="flex justify-between border-t border-gray-100 pt-4 mt-4 relative">[\s\S]*?<\/div>\s*<\/div>/, '');

fs.writeFileSync(filePath, content, 'utf8');
fs.writeFileSync(gitPath, content, 'utf8');
console.log("Updated menu.html rendering logic!");
