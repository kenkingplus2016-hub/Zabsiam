const fs = require('fs');
let data = fs.readFileSync('public/delivery.html', 'utf8').replace(/\r\n/g, '\n');

const oldFunc = `    function extendOptionsWithSpiciness(set) {
        if (!set.options) {
            set.options = [];
        }
        if (set.options.some(o => o.id.includes('spicy'))) {
            return set.options;
        }

        const setStr = JSON.stringify(set).toLowerCase();
        
        // Curry / แกง
        const hasCurry = setStr.includes('แกง') || setStr.includes('curry') || setStr.includes('massaman') || setStr.includes('panang');
        // Basil / กระเพรา / กะเพรา
        const hasBasil = setStr.includes('กระเพรา') || setStr.includes('กะเพรา') || setStr.includes('basil');
        // Som Tum / ส้มตำ
        const hasSomTum = setStr.includes('ส้มตำ') || setStr.includes('som tum') || setStr.includes('somtum') || setStr.includes('papaya salad');

        if (hasCurry) {
            set.options.push({
                id: "spicy_curry",
                label: { "th": "ระดับความเผ็ดแกง", "en": "Spiciness Level - Curry" },
                choices: [
                    { "th": "Mild (เผ็ดน้อย)", "en": "Mild (เผ็ดน้อย)" },
                    { "th": "Medium (เผ็ดกลาง)", "en": "Medium (เผ็ดกลาง)" },
                    { "th": "Thai Spicy", "en": "Thai Spicy" }
                ]
            });
        }

        if (hasBasil) {
            set.options.push({
                id: "spicy_basil",
                label: { "th": "ระดับความเผ็ดผัดกะเพรา", "en": "Spiciness Level - Basil Stir Fry" },
                choices: [
                    { "th": "Mild (เผ็ดน้อย)", "en": "Mild (เผ็ดน้อย)" },
                    { "th": "Medium (เผ็ดกลาง)", "en": "Medium (เผ็ดกลาง)" },
                    { "th": "Thai Spicy", "en": "Thai Spicy" }
                ]
            });
        }

        if (hasSomTum) {
            set.options.push({
                id: "spicy_somtum",
                label: { "th": "ระดับความเผ็ดส้มตำ", "en": "Spiciness Level - Som Tum" },
                choices: [
                    { "th": "Mild (เผ็ดน้อย)", "en": "Mild (เผ็ดน้อย)" },
                    { "th": "Medium (เผ็ดกลาง)", "en": "Medium (เผ็ดกลาง)" },
                    { "th": "Thai Spicy", "en": "Thai Spicy" }
                ]
            });
        }

        return set.options;
    }`.replace(/\r\n/g, '\n');

const newFunc = `    function extendOptionsWithSpiciness(set) {
        if (!set.options) {
            set.options = [];
        }

        // เอาตัวเลือก "เลือกข้าว/เส้น" ออกตามที่คุณลูกค้าต้องการ
        set.options = set.options.filter(o => o.id !== 'carb_type');

        if (set.options.some(o => o.id.includes('spicy'))) {
            return set.options;
        }

        // Add a universal spiciness option for every menu
        set.options.push({
            id: "spicy_level",
            label: { "th": "ระดับความเผ็ด", "en": "Spiciness Level" },
            choices: [
                { "th": "Mild (เผ็ดน้อย)", "en": "Mild (เผ็ดน้อย)" },
                { "th": "Medium (เผ็ดกลาง)", "en": "Medium (เผ็ดกลาง)" },
                { "th": "Thai Spicy (เผ็ดปกติ)", "en": "Thai Spicy (เผ็ดปกติ)" }
            ]
        });

        return set.options;
    }`.replace(/\r\n/g, '\n');

if (data.includes(oldFunc)) {
    data = data.replace(oldFunc, newFunc);
    fs.writeFileSync('public/delivery.html', data);
    console.log("Success");
} else {
    console.log("Target not found!");
}
