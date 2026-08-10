const fs = require('fs');
const path = require('path');

const repoHtml = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\menu.html';
const localHtml = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\menu.html';

function updateFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Update card background and border
    content = content.replace(
        /class="bg-gray-900 rounded-lg overflow-hidden flex flex-col relative group border border-gray-800 shadow-sm hover:shadow-md transition-shadow"/g,
        'class="bg-[#e65c00] rounded-lg overflow-hidden flex flex-col relative group border border-[#e65c00] shadow-sm hover:shadow-md transition-shadow"'
    );

    // Update info icon
    content = content.replace(
        /class="absolute top-2 right-2 bg-gray-900\/80 backdrop-blur-sm text-gray-500 hover:text-dark-green w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors border border-gray-700"/g,
        'class="absolute top-2 right-2 bg-white\/20 backdrop-blur-sm text-white hover:text-gray-200 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors border border-white\/50"'
    );

    // Update title hover color
    content = content.replace(
        /class="font-bold text-white text-\[16px\] mb-2 leading-snug cursor-pointer hover:text-\[#598c73\] transition-colors"/g,
        'class="font-bold text-white text-[16px] mb-2 leading-snug cursor-pointer hover:text-gray-200 transition-colors"'
    );

    // Update price color
    content = content.replace(
        /class="font-bold text-\[#e65c00\] text-lg text-center"/g,
        'class="font-bold text-white text-lg text-center"'
    );

    fs.writeFileSync(filePath, content, 'utf8');
}

updateFile(repoHtml);
updateFile(localHtml);

// I should also check if index.html has similar cards in case they are rendered there
const localIndex = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\index.html';
const repoIndex = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\index.html';
function updateIndex(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // If they have category cards with bg-gray-900
    content = content.replace(
        /class="bg-gray-900 rounded-lg overflow-hidden flex flex-col relative group/g,
        'class="bg-[#e65c00] rounded-lg overflow-hidden flex flex-col relative group'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
}
updateIndex(localIndex);
updateIndex(repoIndex);

console.log("Updated card colors to orange.");
