const fs = require('fs');

const path = 'public/menu.html';
let content = fs.readFileSync(path, 'utf8');

// The file has a duplicate <!DOCTYPE html> around line 279.
// Let's find the first occurrence of <!DOCTYPE html> after the first 100 characters.
const secondDoctypeIndex = content.indexOf('<!DOCTYPE html>', 100);

if (secondDoctypeIndex !== -1) {
    // Keep only the first block
    content = content.substring(0, secondDoctypeIndex);
}

// Ensure the HTML is properly closed
if (!content.includes('</body>')) {
    content += '\n</body>\n</html>';
}

// Now we need to inject the changeLang function inside the <script> block.
// Let's find "document.addEventListener('DOMContentLoaded', loadBuffetMenu);"
const marker = "document.addEventListener('DOMContentLoaded', loadBuffetMenu);";
if (content.includes(marker) && !content.includes('function changeLang')) {
    const changeLangCode = `
        function changeLang(lang, btn) {
            currentLang = lang;
            document.documentElement.lang = lang;
            
            // Update Buttons
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            if(btn) btn.classList.add('active');

            // Re-render buffet menu
            renderBuffet();
        }
    `;
    content = content.replace(marker, changeLangCode + '\n        ' + marker);
}

fs.writeFileSync(path, content, 'utf8');
console.log("Fixed menu.html");
