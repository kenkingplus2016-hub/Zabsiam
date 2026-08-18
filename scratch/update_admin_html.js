const fs = require('fs');

function updateAdminHtml(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    // 1. Add global variables
    const varSearch = 'let globalCurryMenuData = [];';
    const varInsert = 'let globalCurryMenuData = [];\n        let globalBanquetMenuData = [];\n        let globalEventCateringData = [];';
    if (html.includes(varSearch) && !html.includes('globalBanquetMenuData')) {
        html = html.replace(varSearch, varInsert);
    }

    // 2. Add fetch calls in loadImagesAndMenu() or similar places where data is loaded
    // Searching for the place where menu data is fetched...
    const fetchSearch = "const res = await fetch('/api/curry-menu');\n            if(res.ok) {\n                globalCurryMenuData = await res.json();\n            }";
    
    // Wait, let's use a safer regex or replace
    const fetchReplaceRegex = /globalCurryMenuData = await res\.json\(\);\s*\}/;
    if (fetchReplaceRegex.test(html) && !html.includes('/api/banquet-menu')) {
        const fetchInsert = `globalCurryMenuData = await res.json();
            }
            
            try {
                const resBanq = await fetch('/api/banquet-menu').catch(() => fetch('/data/banquet_menu.json'));
                if(resBanq && resBanq.ok) globalBanquetMenuData = await resBanq.json();
                
                const resEvt = await fetch('/api/event-catering').catch(() => fetch('/data/event_catering.json'));
                if(resEvt && resEvt.ok) globalEventCateringData = await resEvt.json();
            } catch(e) { console.log(e); }
`;
        html = html.replace(fetchReplaceRegex, fetchInsert);
    } else if (!html.includes('/api/banquet-menu')) {
        // Fallback for injecting fetch
        const fallbackSearch = 'globalCurryMenuData = await res.json();\n            }';
        const fallbackInsert = `globalCurryMenuData = await res.json();\n            }\n            try { const resB = await fetch('/data/banquet_menu.json'); if(resB.ok) globalBanquetMenuData = await resB.json(); const resE = await fetch('/data/event_catering.json'); if(resE.ok) globalEventCateringData = await resE.json(); } catch(e){}`;
        html = html.replace(fallbackSearch, fallbackInsert);
    }

    // 3. Add to dropdown
    const dropdownSearch = "addMenus(globalCurryMenuData, '??????');";
    const dropdownInsert = "addMenus(globalCurryMenuData, '??????');\n            addMenus(globalBanquetMenuData, 'Banquet');\n            addMenus(globalEventCateringData, 'Event Catering');";
    
    if (html.includes(dropdownSearch) && !html.includes("addMenus(globalBanquetMenuData")) {
        html = html.replace(dropdownSearch, dropdownInsert);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated", filePath);
}

updateAdminHtml('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/admin.html');
updateAdminHtml('C:/Users/KENDEE/Desktop/เว็บ/public/admin.html');
