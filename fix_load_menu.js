const fs = require('fs');

let html = fs.readFileSync('public/menu.html', 'utf8');

const broken = 
"    async function loadMenuData() {\n" +
"            console.error(\"Error loading menu:\", err);\n" +
"        }\n" +
"    }";

const broken2 = 
"    async function loadMenuData() {\r\n" +
"            console.error(\"Error loading menu:\", err);\r\n" +
"        }\r\n" +
"    }";

const fixed = 
"    async function loadMenuData() {\n" +
"        try {\n" +
"            const res = await fetch('/api/menu');\n" +
"            if (res.ok) {\n" +
"                menuSets = await res.json();\n" +
"                menuSets.forEach(s => s.unit = { th: '5 ท่าน', en: '5 Persons' });\n" +
"                renderMenu();\n" +
"            } else {\n" +
"                console.error('Failed to load menu data');\n" +
"            }\n" +
"        } catch (err) {\n" +
"            console.error('Error loading menu:', err);\n" +
"        }\n" +
"    }";

if (html.includes(broken)) {
    html = html.replace(broken, fixed);
} else if (html.includes(broken2)) {
    html = html.replace(broken2, fixed);
} else {
    // try to find it by regex
    html = html.replace(/async function loadMenuData\(\) \{\s*console\.error\("Error loading menu:", err\);\s*\}\s*\}/, fixed);
}

fs.writeFileSync('public/menu.html', html, 'utf8');
console.log("Restored loadMenuData function.");
