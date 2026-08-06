const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Define the new card HTML template that matches the COOK screenshot
    const newCardTemplate = `
                        <div class="bg-white rounded-lg overflow-hidden flex flex-col relative group border border-gray-100 shadow-sm hover:shadow-md transition-shadow" id="card-\${item.id}">
                            <div class="relative w-full aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
                                <img src="\${imgSrc}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onerror="this.src='logo.png';">
                                <!-- Info Icon (Top Right) -->
                                <button onclick="showQRCode('\${item.id}', '\${item.en}', \${item.price})" class="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-gray-500 hover:text-dark-green w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors border border-gray-200">
                                    <i class="fas fa-info"></i>
                                </button>
                            </div>
                            
                            <div class="p-4 flex flex-col flex-1">
                                <h3 class="font-bold text-gray-800 text-[16px] mb-2 leading-snug">\${item.en}</h3>
                                
                                <!-- Dietary Icons (Placeholder) -->
                                <div class="flex gap-1.5 mb-4 text-gray-400 text-xs">
                                    <span class="border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center" title="Gluten Free">GF</span>
                                    <span class="border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center" title="Dairy Free">DF</span>
                                </div>
                                
                                <div class="mt-auto">
                                    <div class="flex justify-between border-t border-gray-100 pt-3 relative">
                                        <!-- Vertical divider -->
                                        <div class="absolute left-1/2 top-3 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>
                                        
                                        <!-- Serves 1 Column -->
                                        <div class="flex flex-col items-center w-1/2 px-1">
                                            <p class="font-bold text-gray-800 text-lg mb-1">£\${item.price.toFixed(2)}</p>
                                            <p class="text-[11px] font-semibold text-gray-800 mb-2">Serves 1 <span class="font-normal text-gray-500">(250g)</span></p>
                                            <button onclick="addBuffetItem('\${item.id}_s1', '\${item.en} (Serves 1)', \${item.price}, '\${imgSrc}')" class="w-full bg-[#3F7283] text-white py-1.5 rounded text-sm font-bold hover:bg-[#2c5361] transition-colors">
                                                Add
                                            </button>
                                        </div>
                                        
                                        <!-- Serves 2 Column -->
                                        <div class="flex flex-col items-center w-1/2 px-1">
                                            <p class="font-bold text-gray-800 text-lg mb-1">£\${(item.price * 1.7).toFixed(2)}</p>
                                            <p class="text-[11px] font-semibold text-gray-800 mb-2">Serves 2 <span class="font-normal text-gray-500">(500g)</span></p>
                                            <button onclick="addBuffetItem('\${item.id}_s2', '\${item.en} (Serves 2)', \${item.price * 1.7}, '\${imgSrc}')" class="w-full bg-[#3F7283] text-white py-1.5 rounded text-sm font-bold hover:bg-[#2c5361] transition-colors">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    // The old string we are replacing starts with `<div class="bg-white rounded-lg overflow-hidden flex flex-col relative group" id="card-${item.id}">`
    // We will use a regex to replace the entire old card block inside renderGrid.
    
    // Using a regex to find the old card block inside renderGrid
    const oldCardRegex = /<div class="bg-white rounded-lg overflow-hidden flex flex-col relative group"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*`;/g;
    
    content = content.replace(oldCardRegex, newCardTemplate + '\n                    `;');
    
    // Also update the grid columns to match the slightly wider cards needed for the two-column layout
    // Change from: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
    // To: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    content = content.replace(
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5', 
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Processed: ' + filePath);
}
