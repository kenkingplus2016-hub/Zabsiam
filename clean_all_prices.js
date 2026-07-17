const fs = require('fs');

function cleanFile(path) {
    try {
        let content = fs.readFileSync(path, 'utf8');
        const originalContent = content;
        
        // Use a regex to match (+£X) taking account of potential encoding issues or spaces
        // The previous output showed (+3) which means it might be stored with weird encoding or just the console output was weird.
        // It's just (+£2) or (+£3). We will also catch spaces.
        content = content.replace(/\s*\(\+\£\d+\)/g, '');
        
        if (content !== originalContent) {
            fs.writeFileSync(path, content, 'utf8');
            console.log(`Cleaned ${path}`);
        } else {
            console.log(`No changes needed in ${path}`);
        }
    } catch (e) {
        console.log(`Error reading ${path}: ${e.message}`);
    }
}

cleanFile('data/menu.json');
cleanFile('data/royal_menu.json');
cleanFile('data/buffet_menu.json'); // Just in case my previous regex missed something
