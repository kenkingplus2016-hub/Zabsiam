const fs = require('fs');
const path = require('path');

const repoJson = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json';
const apiPathLocal = 'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api\\buffet';
const apiPathGit = 'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api\\buffet';

try {
    const cleanJson = fs.readFileSync(repoJson, 'utf8');

    // Overwrite the actual API endpoints
    fs.writeFileSync(apiPathLocal, cleanJson, 'utf8');
    
    if (fs.existsSync(path.dirname(apiPathGit))) {
        fs.writeFileSync(apiPathGit, cleanJson, 'utf8');
    }

    console.log("Successfully synchronized the clean JSON to public/api/buffet!");
} catch (e) {
    console.error(e);
}
