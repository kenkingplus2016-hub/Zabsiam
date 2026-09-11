const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function updateSEO(filename, title, description, keywords, jsonLd) {
    const filePath = path.join(publicDir, filename);
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace Title
    html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
    
    // Replace Meta Description
    html = html.replace(/<meta name="description" content=".*?">/s, `<meta name="description" content="${description}">`);
    
    // Replace Meta Keywords
    if (html.includes('<meta name="keywords"')) {
        html = html.replace(/<meta name="keywords" content=".*?">/s, `<meta name="keywords" content="${keywords}">`);
    } else {
        html = html.replace('</head>', `    <meta name="keywords" content="${keywords}">\n</head>`);
    }

    // Inject JSON-LD if not present
    if (!html.includes('application/ld+json')) {
        html = html.replace('</head>', `    <script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 2)}\n    </script>\n</head>`);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Optimized SEO for', filename);
}

const businessContext = {
    "@type": "FoodEstablishment",
    "@id": "https://zabsiam.com/#business",
    "name": "Zab Siam",
    "url": "https://zabsiam.com/",
    "logo": "https://zabsiam.com/images/zabsiam_logo_transparent.png",
    "address": {"@type":"PostalAddress","streetAddress":"Mission Kitchen, 1st Floor, The Food Exchange, New Covent Garden Market","addressLocality":"London","postalCode":"SW8 5EL","addressCountry":"GB"},
    "areaServed": "London, UK",
    "servesCuisine": "Thai"
};

// 1. Canapes
updateSEO('canapes.html',
    'Premium Thai Canapé Catering London | Zab Siam',
    'Elevate your event with authentic Thai Canapés in London. Perfect for receptions, weddings, and corporate gatherings. Choose from our Siam Classic, Zab Siam Signature, and Royal Thai Premium packages.',
    'Thai canapes London, Thai catering London, Thai party food, corporate catering UK, bite-sized Thai food, Zab Siam canapes',
    {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Thai Canapé Menu",
        "description": "Authentic bite-sized Thai delicacies for events and receptions.",
        "mainEntityOfPage": "https://zabsiam.com/canapes.html",
        "publisher": businessContext,
        "hasMenuItem": [
            {"@type": "MenuItem", "name": "Mini Moo Ping (Pork Skewers)", "offers": {"@type": "Offer", "price": "33.60", "priceCurrency": "GBP"}},
            {"@type": "MenuItem", "name": "Chicken Satay", "offers": {"@type": "Offer", "price": "33.60", "priceCurrency": "GBP"}},
            {"@type": "MenuItem", "name": "Mini Beef Basil Burger", "offers": {"@type": "Offer", "price": "42.00", "priceCurrency": "GBP"}}
        ]
    }
);

// 2. Delivery (Party Trays)
updateSEO('delivery.html',
    'Thai Party Trays & Delivery London | Large Portions | Zab Siam',
    'Order authentic Thai party trays and large portion curries delivered across London. Ideal for office lunches, house parties, and family gatherings. Featuring Green Curry, Red Duck Curry, and Sea Bass.',
    'Thai party trays London, Thai food delivery London, order Thai food bulk, Thai office lunch, Zab Siam delivery, large portion Thai food',
    {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Thai Party Trays & Delivery",
        "description": "Large portion Thai delivery for office lunches and parties.",
        "mainEntityOfPage": "https://zabsiam.com/delivery.html",
        "publisher": businessContext,
        "hasMenuItem": [
            {"@type": "MenuItem", "name": "Red Duck Curry (4000ml)", "offers": {"@type": "Offer", "price": "65.00", "priceCurrency": "GBP"}},
            {"@type": "MenuItem", "name": "Choo Chee Fried Sea Bass (4000ml)", "offers": {"@type": "Offer", "price": "65.00", "priceCurrency": "GBP"}},
            {"@type": "MenuItem", "name": "Massaman Beef Curry (4000ml)", "offers": {"@type": "Offer", "price": "65.00", "priceCurrency": "GBP"}}
        ]
    }
);

// 3. Event Catering
updateSEO('event-catering.html',
    'Thai Event & Wedding Catering London | Live Stations | Zab Siam',
    'Bespoke Thai catering for weddings, corporate events, and private banquets in London. We offer Live Pad Thai stations, Som Tum stations, and full buffet setups.',
    'Thai wedding catering London, Thai event catering UK, Live Pad Thai station, private Thai chef London, Thai buffet catering',
    {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Catering Service",
        "name": "Thai Event Catering",
        "description": "Premium Thai event catering with live stations and buffets.",
        "provider": businessContext,
        "areaServed": "London",
        "offers": [
            {"@type": "Offer", "name": "Live Pad Thai Station", "price": "650.00", "priceCurrency": "GBP"},
            {"@type": "Offer", "name": "Full Buffet Setup", "price": "35.00", "priceCurrency": "GBP"}
        ]
    }
);

// 4. Meeting Meals
updateSEO('meeting-meals.html',
    'Corporate Thai Meeting Meals & Lunch Boxes London | Zab Siam',
    'Premium Thai lunch boxes and meeting meals for corporate events in London. Featuring Pad Kra Pao, Green Curry, and Vegan options in elegant bento boxes.',
    'Thai lunch boxes London, corporate meeting meals, office lunch delivery, Thai bento box, vegan office lunch',
    {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "Corporate Meeting Meals",
        "description": "Premium Thai bento boxes for corporate lunches.",
        "publisher": businessContext,
        "hasMenuItem": [
            {"@type": "MenuItem", "name": "Premium Bento: Pad Kra Pao Moo Krob", "offers": {"@type": "Offer", "price": "18.50", "priceCurrency": "GBP"}},
            {"@type": "MenuItem", "name": "Executive Box: Massaman Beef", "offers": {"@type": "Offer", "price": "22.00", "priceCurrency": "GBP"}}
        ]
    }
);
