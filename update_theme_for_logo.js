const fs = require('fs');
const path = require('path');

const publicDirLocal = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public';
const publicDirRepo = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public';

const filesToUpdate = ['index.html', 'menu.html', 'checkout.html', 'desserts.html'];

function updateTheme(dir) {
    if (!fs.existsSync(dir)) return;
    
    filesToUpdate.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Update Header background to black
            content = content.replace(/<header class="bg-white/g, '<header class="bg-black');
            
            // Update Text colors in header
            content = content.replace(/text-\[#1a433d\]/g, 'text-white'); // main text
            content = content.replace(/text-gray-600 font-bold hover:text-\[#e65c00\]/g, 'text-gray-300 font-bold hover:text-[#ff6a00]'); // nav links
            
            // Update Mobile menu icon color if it exists
            content = content.replace(/text-gray-800 focus:outline-none/g, 'text-white focus:outline-none');
            
            // Update Footer background to black
            content = content.replace(/<footer class="bg-gray-100/g, '<footer class="bg-black');
            content = content.replace(/<footer class="bg-white/g, '<footer class="bg-black');
            content = content.replace(/text-gray-500 font-bold/g, 'text-gray-400 font-bold');

            fs.writeFileSync(filePath, content, 'utf8');
        }
    });
}

try {
    updateTheme(publicDirLocal);
    updateTheme(publicDirRepo);
    console.log("Successfully updated the theme to dark mode for the header and footer to match the new logo.");
} catch (e) {
    console.error(e);
}
