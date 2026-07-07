const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'data', 'classic_menu.json');
let menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

let changed = false;

menuData.forEach(item => {
    if (item.options) {
        item.options.forEach(opt => {
            if (opt.choices) {
                opt.choices.forEach(choice => {
                    // Check and replace .00 in TH
                    if (choice.th && choice.th.includes('.00)')) {
                        choice.th = choice.th.replace(/\.00\)/g, ')');
                        changed = true;
                    }
                    // Check and replace .00 in EN
                    if (choice.en && choice.en.includes('.00)')) {
                        choice.en = choice.en.replace(/\.00\)/g, ')');
                        changed = true;
                    }
                });
            }
        });
    }
});

if (changed) {
    fs.writeFileSync(menuPath, JSON.stringify(menuData, null, 4), 'utf8');
    console.log("Successfully removed .00 from all options!");
} else {
    console.log("No .00 found in options.");
}
