const fs = require('fs');

const files = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html'
];

const newCookingContent = `
                    <div id="acc-cooking" class="hidden pb-5 text-[14px] text-gray-700 leading-relaxed">
                        <p class="mb-4 font-medium text-gray-600">
                            These cooking instructions are only a guide. Your appliance may have a personality of its own (or a different power rating). Please adjust accordingly.
                        </p>
                        
                        <!-- SERVES 1 -->
                        <div class="bg-gray-100 text-center py-1.5 text-xs font-bold uppercase tracking-widest mb-4 text-gray-500">
                            serves 1
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold text-gray-800 mb-1">Microwave:</h4>
                            <p class="mb-3">Remove sleeve, pierce film lid and place on a microwaveable plate. Cook on full power.</p>
                            <div class="flex items-center gap-2 mb-2 font-semibold">
                                <i class="fas fa-wave-square text-lg w-6 text-center text-gray-600"></i> <span>850W</span>
                            </div>
                            <div class="flex items-start gap-2 mb-4">
                                <i class="far fa-clock text-lg w-6 text-center mt-0.5 text-gray-600"></i>
                                <span>3 mins &gt; stir gently &amp; re-cover &gt; 2 mins<br>Allow to stand for 2 mins and stir well before serving. Ensure piping hot.</span>
                            </div>
                            
                            <h4 class="font-bold text-gray-800 mb-1">Oven:</h4>
                            <p class="mb-3">Preheat oven. Remove sleeve and pierce film. Place on a baking tray in the centre of the oven.</p>
                            <h5 class="font-bold text-gray-600 text-xs mb-2">Oven Settings</h5>
                            <div class="flex items-center gap-2 mb-2 font-semibold">
                                <i class="fas fa-fire-burner text-lg w-6 text-center text-gray-600"></i> <span>Fan 180&deg;C, Electric 200&deg;C, Gas Mark 6.</span>
                            </div>
                            <div class="flex items-start gap-2 mb-4">
                                <i class="far fa-clock text-lg w-6 text-center mt-0.5 text-gray-600"></i>
                                <span>40 mins<br>Allow to stand for 2 mins and stir well before serving. Ensure piping hot.</span>
                            </div>

                            <h4 class="font-bold text-gray-800 mb-1">Defrost Instructions:</h4>
                            <p class="mb-4">Should this product defrost, keep refrigerated and eat within 48 hours. Follow the microwave guidelines but cook for 2 mins - stir well then cook for a further 1 min 30 secs.</p>

                            <h4 class="font-bold text-gray-800 mb-1">Extra Warnings:</h4>
                            <p class="mb-2">Although every care has been taken to remove all bones, some may remain. Steam may be released when removing film lid.</p>
                        </div>

                        <!-- SERVES 2 -->
                        <div class="bg-gray-100 text-center py-1.5 text-xs font-bold uppercase tracking-widest mb-4 text-gray-500 mt-8">
                            serves 2
                        </div>
                        <div class="mb-6">
                            <h4 class="font-bold text-gray-800 mb-1">Microwave:</h4>
                            <p class="mb-3">Remove sleeve, pierce film lid and place on a microwaveable plate. Cook on full power.</p>
                            <div class="flex items-center gap-2 mb-2 font-semibold">
                                <i class="fas fa-wave-square text-lg w-6 text-center text-gray-600"></i> <span>850W</span>
                            </div>
                            <div class="flex items-start gap-2 mb-4">
                                <i class="far fa-clock text-lg w-6 text-center mt-0.5 text-gray-600"></i>
                                <span>7 mins &gt; stir gently &amp; re-cover &gt; 6 mins<br>Allow to stand for 2 mins and stir well before serving. Ensure piping hot.</span>
                            </div>
                            
                            <h4 class="font-bold text-gray-800 mb-1">Oven:</h4>
                            <p class="mb-3">Preheat oven. Remove sleeve and pierce film. Place on a baking tray in the centre of the oven.</p>
                            <h5 class="font-bold text-gray-600 text-xs mb-2">Oven Settings</h5>
                            <div class="flex items-center gap-2 mb-2 font-semibold">
                                <i class="fas fa-fire-burner text-lg w-6 text-center text-gray-600"></i> <span>Fan 180&deg;C, Electric 200&deg;C, Gas Mark 6.</span>
                            </div>
                            <div class="flex items-start gap-2 mb-4">
                                <i class="far fa-clock text-lg w-6 text-center mt-0.5 text-gray-600"></i>
                                <span>45 mins<br>Allow to stand for 2 mins and stir well before serving. Ensure piping hot.</span>
                            </div>

                            <h4 class="font-bold text-gray-800 mb-1">Defrost Instructions:</h4>
                            <p class="mb-4">Should this product defrost, keep refrigerated and eat within 48 hours. Follow the microwave guidelines but cook for 3 mins - stir well - 3 mins.</p>

                            <h4 class="font-bold text-gray-800 mb-1">Extra Warnings:</h4>
                            <p class="mb-2">Although every care has been taken to remove all bones, some may remain. Steam may be released when removing film lid.</p>
                        </div>

                        <!-- SERVES 4 -->
                        <div class="bg-gray-100 text-center py-1.5 text-xs font-bold uppercase tracking-widest mb-4 text-gray-500 mt-8">
                            serves 4
                        </div>
                        <div class="mb-2">
                            <h4 class="font-bold text-gray-800 mb-1">Microwave:</h4>
                            <p class="mb-3">Remove sleeve, pierce film lid and place on a microwaveable plate. Cook on full power.</p>
                            <div class="flex items-center gap-2 mb-2 font-semibold">
                                <i class="fas fa-wave-square text-lg w-6 text-center text-gray-600"></i> <span>850W</span>
                            </div>
                            <div class="flex items-start gap-2 mb-4">
                                <i class="far fa-clock text-lg w-6 text-center mt-0.5 text-gray-600"></i>
                                <span>10 mins &gt; stir gently &amp; re-cover &gt; 9 mins<br>Allow to stand for 2 mins and stir well before serving. Ensure piping hot.</span>
                            </div>
                            
                            <h4 class="font-bold text-gray-800 mb-1">Oven:</h4>
                            <p class="mb-3">Preheat oven. Remove sleeve and pierce film. Place on a baking tray in the centre of the oven.</p>
                            <h5 class="font-bold text-gray-600 text-xs mb-2">Oven Settings</h5>
                            <div class="flex items-center gap-2 mb-2 font-semibold">
                                <i class="fas fa-fire-burner text-lg w-6 text-center text-gray-600"></i> <span>Fan 180&deg;C, Electric 200&deg;C, Gas Mark 6.</span>
                            </div>
                            <div class="flex items-start gap-2 mb-4">
                                <i class="far fa-clock text-lg w-6 text-center mt-0.5 text-gray-600"></i>
                                <span>60 mins<br>Allow to stand for 2 mins and stir well before serving. Ensure piping hot.</span>
                            </div>

                            <h4 class="font-bold text-gray-800 mb-1">Defrost Instructions:</h4>
                            <p class="mb-4">Should this product defrost, keep refrigerated and eat within 48 hours. Follow the microwave guidelines but cook for 5 mins - stir well - 5 mins.</p>

                            <h4 class="font-bold text-gray-800 mb-1">Extra Warnings:</h4>
                            <p class="mb-2">Although every care has been taken to remove all bones, some may remain. Steam may be released when removing film lid.</p>
                        </div>
                    </div>
`;

for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the old acc-cooking div with the new detailed one
    const oldCookingDivRegex = /<div id="acc-cooking" class="hidden pb-5 text-\[14px\] text-gray-700 leading-relaxed">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
    
    // The previous regex might match too much because of the greedy/non-greedy match or nested divs.
    // Let's use string manipulation to be safe.
    
    const startStr = '<div id="acc-cooking" class="hidden pb-5 text-[14px] text-gray-700 leading-relaxed">';
    const startIndex = content.indexOf(startStr);
    
    if (startIndex !== -1) {
        // Find the matching closing div
        let openDivs = 1;
        let currentIndex = startIndex + startStr.length;
        while (openDivs > 0 && currentIndex < content.length) {
            const nextOpen = content.indexOf('<div', currentIndex);
            const nextClose = content.indexOf('</div', currentIndex);
            
            if (nextOpen !== -1 && nextOpen < nextClose) {
                openDivs++;
                currentIndex = nextOpen + 4;
            } else if (nextClose !== -1) {
                openDivs--;
                currentIndex = nextClose + 6; // length of </div>
            } else {
                break; // Error
            }
        }
        
        const before = content.substring(0, startIndex);
        const after = content.substring(currentIndex);
        
        content = before + newCookingContent + after;
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Processed: ' + filePath);
    } else {
        console.log('Could not find acc-cooking in: ' + filePath);
    }
}
