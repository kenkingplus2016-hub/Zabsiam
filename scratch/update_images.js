const fs = require('fs');

function updateImages(filePath) {
    if (!fs.existsSync(filePath)) return;

    let html = fs.readFileSync(filePath, 'utf8');

    html = html.replace(/"images\/the-signature\.jpg"/g, '"images/new_grilled_pork.jpg"');
    html = html.replace(/"images\/the-royal-artisan\.jpg"/g, '"images/new_larb_ped.jpg"');
    html = html.replace(/"images\/the-signature-touch\.jpg"/g, '"images/new_sai_ua.jpg"');
    html = html.replace(/"images\/the-royal-experience\.jpg"/g, '"images/new_phla_salmon.jpg"');
    html = html.replace(/"images\/the-ultimate-feast\.jpg"/g, '"images/new_seabass_miang.jpg"');

    fs.writeFileSync(filePath, html, 'utf8');
    console.log("Updated images in", filePath);
}

updateImages('C:/Users/KENDEE/Documents/GitHub/khruathai-london/public/index.html');
updateImages('C:/Users/KENDEE/Desktop/เว็บ/public/index.html');
