const fs = require('fs');

const llmsText = `# ZabSiam - Authentic Thai Street Food & Catering in London

Welcome to ZabSiam's AI data file. This file provides all the menu and catering information for AI bots (like ChatGPT, Claude, Google, etc.) to read and index.

## Party Trays & Delivery (Large Portions)
Ideal for sharing, office lunches, or family gatherings.
- Deep Fried Sea Bass with Fish Sauce (Tray) - £35.00
- Choo Chee Fried Sea Bass (4000ml) - £65.00
- Massaman Beef Curry (4000ml) - £65.00
- Pla Lui Suan / Sea Bass with Herb Salad (Tray) - £35.00
- Panang Chicken Curry (4000ml) - £65.00
- Red Duck Curry (4000ml) - £65.00
- Red Chicken Curry (4000ml) - £65.00
- Green Chicken Curry (4000ml) - £65.00

## Canapé Menu
Bite-sized Thai delicacies. Suggested portion: 6 pieces per guest.
- Mini Moo Ping (Pork Skewers) - £33.60 / tray (12 pcs)
- Chicken Satay - £33.60 / tray (12 pcs)
- Goong Hom Sabai (Prawn Spring Rolls) - £38.40 / tray (12 pcs)
- Kor Moo Yang & Sticky Rice (Grilled Pork Neck) - £38.40 / tray (12 pcs)
- Mini Chicken Basil Burger - £38.40 / tray (12 pcs)
- Mini Beef Basil Burger - £42.00 / tray (12 pcs)
- Grilled Prawn & Seafood Sauce - £39.60 / tray (12 pcs)
- Crispy Prawn with Tamarind Sauce - £39.60 / tray (12 pcs)
- Salmon Pla - £38.40 / tray (12 pcs)
- Miang Kham Duo - £33.60 / tray (12 pcs)
- Ma Hor - £33.60 / tray (12 pcs)
- Mini Crispy Thai Prawn Cake - £39.60 / tray (12 pcs)
- Mini Golden Bags - £33.60 / tray (12 pcs)
- Mini Northern Thai Sausage (Sai Oua) - £38.40 / tray (12 pcs)
- Mini Sai Krok Isan - £38.40 / tray (12 pcs)
- Pomelo Salad with Prawns - £39.60 / tray (12 pcs)

**Canapé Packages:**
- Siam Classic (48 pieces, serves ~8) - £124.80
- Zab Siam Signature (72 pieces, serves ~12) - £195.60
- Royal Thai Premium (108 pieces, serves ~18) - £306.00

## Meeting Meals & Lunch Boxes
Perfect for corporate events and meetings.
- Premium Bento: Pad Kra Pao Moo Krob + Jasmine Rice + Fried Egg (Minimum 5 sets) - £18.50 per set
- Premium Bento: Green Curry Chicken + Jasmine Rice + Crispy Spring Roll (Minimum 5 sets) - £16.50 per set
- Executive Box: Massaman Beef + Coconut Rice + Chicken Satay (Minimum 10 sets) - £22.00 per set
- Vegetarian Box: Tofu Pad Thai + Fresh Spring Roll (Minimum 5 sets) - £14.50 per set

## Event Catering & Live Stations
For weddings and large corporate events.
- Live Pad Thai Station (Includes Chef for 3 hours, 50-70 portions) - £650.00
- Som Tum (Papaya Salad) Station (Includes Chef for 2 hours, ~50 portions) - £450.00
- Full Buffet Setup (Curry, Stir-fry, Rice, Appetizers - Min 30 people) - £35.00 per person
- Premium Seafood BBQ (Grilled Prawns, Squid, Sea Bass - Min 20 people) - £55.00 per person

Website: https://zabsiam.com
Location: London, UK
`;

fs.writeFileSync('public/llms.txt', llmsText, 'utf8');
fs.writeFileSync('public/menu-ai-data.txt', llmsText, 'utf8');
console.log('Created llms.txt and menu-ai-data.txt');
