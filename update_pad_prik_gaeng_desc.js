const fs = require('fs');
const file = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data/classic_menu.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const index = data.findIndex(m => m.id === 'lunch_box_pad_prik_gaeng');

if (index !== -1) {
    // The user wants to change "Signature Lunch Box: Spicy Pad Prik Gaeng Stir Fry. Customize your meat and rice." 
    // to "Signature Box: Stir Fry Spicy Pad Prik Gaeng  Customize your meat and rice."
    data[index].desc.en = data[index].desc.en.replace(
        'Signature Lunch Box: Spicy Pad Prik Gaeng Stir Fry. Customize your meat and rice.',
        'Signature Box: Stir Fry Spicy Pad Prik Gaeng Customize your meat and rice.'
    );
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log("Updated Pad Prik Gaeng Box desc.");
} else {
    console.log("Menu not found.");
}
