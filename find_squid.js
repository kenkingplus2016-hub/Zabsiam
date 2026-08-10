const fs = require('fs');
const dirs = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public\\api',
];
for (const dir of dirs) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = require('path').join(dir, file);
        try {
            const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
            function t(o) {
                if (Array.isArray(o)) { for (let i of o) t(i); }
                else if (o && typeof o === 'object') {
                    let en = o.en || (o.name && o.name.en) || '';
                    if (typeof en === 'string' && en.toLowerCase().includes('squid')) {
                        console.log(file, '|', en, '|', o.img);
                    }
                    for (let k in o) t(o[k]);
                }
            }
            t(data);
        } catch(e) {}
    }
}
