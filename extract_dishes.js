const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/menu.json', 'utf8'));
const dishes = {};

data.forEach(set => {
    set.items.forEach(item => {
        if (item.type.en !== 'Highlight') {
            const key = item.en;
            if (!dishes[key]) {
                dishes[key] = {
                    th: item.th,
                    en: item.en,
                    type_th: item.type.th,
                    type_en: item.type.en
                };
            }
        }
    });
});

console.log(JSON.stringify(Object.values(dishes), null, 2));
