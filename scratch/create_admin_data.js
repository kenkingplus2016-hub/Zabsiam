const fs = require('fs');
const path = require('path');

const dataDir1 = 'C:/Users/KENDEE/Documents/GitHub/khruathai-london/data';
const dataDir2 = 'C:/Users/KENDEE/Desktop/เว็บ/data';

const banquetMenu = [
    {
        "id": "BNQ-1",
        "name": {
            "en": "8-Course Ultimate Banquet",
            "th": "The Ultimate Feast"
        },
        "price": 88,
        "items": []
    },
    {
        "id": "BNQ-2",
        "name": {
            "en": "8-Course Northern Heritage Banquet",
            "th": "The Signature Touch"
        },
        "price": 68,
        "items": []
    },
    {
        "id": "BNQ-3",
        "name": {
            "en": "8-Course Siam Spice Banquet",
            "th": "The Royal Experience"
        },
        "price": 79,
        "items": []
    },
    {
        "id": "BNQ-4",
        "name": {
            "en": "8-Course Exotic Fusion Banquet",
            "th": "Exotic Fusion"
        },
        "price": 88,
        "items": []
    }
];

const eventCatering = [
    {
        "id": "EVT-1",
        "name": {
            "en": "Event Catering: Intimate Birthday Celebration",
            "th": "Birthday Celebration"
        },
        "price": 2000,
        "items": []
    },
    {
        "id": "EVT-2",
        "name": {
            "en": "Event Catering: Art Gallery Opening Catering",
            "th": "Art Gallery Opening"
        },
        "price": 2000,
        "items": []
    },
    {
        "id": "EVT-3",
        "name": {
            "en": "Event Catering: City Corporate Launch",
            "th": "Corporate Launch"
        },
        "price": 2000,
        "items": []
    },
    {
        "id": "EVT-4",
        "name": {
            "en": "Event Catering: Wedding Summer Food Festival Style",
            "th": "Wedding Food Festival"
        },
        "price": 2000,
        "items": []
    }
];

function writeData(dir) {
    if (!fs.existsSync(dir)) return;
    fs.writeFileSync(path.join(dir, 'banquet_menu.json'), JSON.stringify(banquetMenu, null, 2), 'utf8');
    fs.writeFileSync(path.join(dir, 'event_catering.json'), JSON.stringify(eventCatering, null, 2), 'utf8');
}

writeData(dataDir1);
writeData(dataDir2);

console.log("Created banquet_menu.json and event_catering.json");
