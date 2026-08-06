const fs = require('fs');

const filePaths = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data\\buffet_menu.json',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\buffet_menu.json'
];

filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let updated = false;

        data.forEach(category => {
            if (category.items) {
                category.items.forEach(item => {
                    const en = item.en || "";
                    if (en === "Pandan Coconut Jelly") {
                        item.img = "Pandan Coconut Jelly.jpg";
                        updated = true;
                    }
                    if (en === "Butterfly Pea Coconut Jelly") {
                        item.img = "Butterfly Pea Coconut Jelly with Young Coconut.jpg";
                        updated = true;
                    }
                    if (en === "Khanom Mo Kaeng") {
                        item.img = "Khanom Mo Kaeng.jpg";
                        updated = true;
                    }
                    if (en === "5-Color Bua Loy") {
                        item.img = "bua_loy_5_color.jpg";
                        updated = true;
                    }
                });
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
            console.log(`Updated images in ${filePath}`);
        }
    }
});
