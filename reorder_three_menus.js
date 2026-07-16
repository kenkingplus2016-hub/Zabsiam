const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Extract the three menus
const horMokIdx = data.findIndex(m => m.id === 'lunch_box_hor_mok_seafood');
const horMok = data.splice(horMokIdx, 1)[0];

const klukFunIdx = data.findIndex(m => m.id === 'lunch_box_gai_kluk_fun');
const klukFun = data.splice(klukFunIdx, 1)[0];

const yamGaiIdx = data.findIndex(m => m.id === 'lunch_box_yam_gai_zaap');
const yamGai = data.splice(yamGaiIdx, 1)[0];

// Find Prik Klua
const prikKluaIdx = data.findIndex(m => m.id === 'lunch_box_prik_klua');

if (prikKluaIdx !== -1) {
    // Insert the three menus immediately after Prik Klua
    data.splice(prikKluaIdx + 1, 0, horMok, klukFun, yamGai);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Reordered the three signature boxes successfully.");
} else {
    console.log("Prik Klua menu not found!");
}
