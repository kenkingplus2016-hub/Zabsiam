const fs = require('fs');

function addFishMaw(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log("File not found:", filePath);
        return;
    }
    
    let html = fs.readFileSync(filePath, 'utf8');

    const searchStr = '<li>Northern Thai Sausage (Sai Ua หมูไส้อั่ว)</li>';
    const insertStr = '<li>Northern Thai Sausage (Sai Ua หมูไส้อั่ว)</li>\n                            <li>Fish Maw Soup (Kra Pho Pla กระเพาะปลา)</li>';
    
    if (html.includes(searchStr) && !html.includes('Fish Maw Soup (Kra Pho Pla กระเพาะปลา)')) {
        html = html.split(searchStr).join(insertStr);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log("Updated", filePath);
    } else {
        console.log("Already added or could not find insertion point.");
    }
}

addFishMaw('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
addFishMaw('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
