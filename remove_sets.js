const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public\\api'
];

// Categories to remove (by English name, case-insensitive)
const removeNames = [
    "buffet set packages",
    "event party sets",
    "coffee & tea break sets",
    "coffee &amp; tea break sets",
    "value bundle packages"
];

function update(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.json') || !file.includes('.'))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let data = JSON.parse(content);
                let changed = false;

                // If data is an array (top-level categories), filter them out
                if (Array.isArray(data)) {
                    const before = data.length;
                    data = data.filter(cat => {
                        // Check category name
                        let en = cat.en || (cat.name && cat.name.en) || (cat.category && cat.category.en) || "";
                        if (typeof en === 'string' && removeNames.includes(en.trim().toLowerCase())) {
                            return false;
                        }
                        return true;
                    });
                    if (data.length !== before) {
                        changed = true;
                    }
                }

                if (changed) {
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                    console.log('Removed categories in: ' + filePath + ' (was ' + before + ', now ' + data.length + ')');
                }
            } catch (err) {}
        }
    }
}

// Fix: 'before' is scoped wrong, let me rewrite
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isFile() && (file.endsWith('.json') || !file.includes('.'))) {
            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let data = JSON.parse(content);

                if (Array.isArray(data)) {
                    const before = data.length;
                    data = data.filter(cat => {
                        let en = cat.en || (cat.name && cat.name.en) || (cat.category && cat.category.en) || "";
                        if (typeof en === 'string' && removeNames.includes(en.trim().toLowerCase())) {
                            console.log('  Removing: ' + en.trim());
                            return false;
                        }
                        return true;
                    });
                    if (data.length !== before) {
                        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
                        console.log('Updated: ' + filePath + ' (' + before + ' -> ' + data.length + ' categories)');
                    }
                }
            } catch (err) {}
        }
    }
});
