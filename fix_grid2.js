const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

const target = `                                        <!-- Serves 1 Column -->
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
                                        </div>`;

const repl = `                                        <!-- Serves 1 Column -->
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
                                        </div>`;

for (let file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(target)) {
            content = content.replace(target, repl);
            fs.writeFileSync(file, content, 'utf8');
            console.log('Fixed: ' + file);
        } else {
            console.log('Target string not found in: ' + file);
        }
    }
}
