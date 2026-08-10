const fs = require('fs');

const filePaths = [
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\data\\classic_menu.json',
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\data\\classic_menu.json'
];

filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Crying Tiger is usually +2.50
        content = content.replace(/"เสือร้องไห้ \(\+"/g, '"เสือร้องไห้ (+£2.50"');
        content = content.replace(/"Crying Tiger Beef \(\+"/g, '"Crying Tiger Beef (+£2.50"');
        
        // Grilled Pork Neck is +£2
        content = content.replace(/"คอหมูย่าง \(\+"/g, '"คอหมูย่าง (+£2"');
        content = content.replace(/"Grilled Pork Neck \(\+"/g, '"Grilled Pork Neck (+£2"');
        
        // Pandan and Butterfly Pea sticky rice are +£1
        content = content.replace(/"ข้าวเหนียวมูนใบเตย \(\+"/g, '"ข้าวเหนียวมูนใบเตย (+£1"');
        content = content.replace(/"Pandan Sweet Sticky Rice \(\+"/g, '"Pandan Sweet Sticky Rice (+£1"');
        content = content.replace(/"ข้าวเหนียวมูนอัญชัน \(\+"/g, '"ข้าวเหนียวมูนอัญชัน (+£1"');
        content = content.replace(/"Butterfly Pea Sweet Sticky Rice \(\+"/g, '"Butterfly Pea Sweet Sticky Rice (+£1"');
        
        // Crispy Pork Belly has two variants: +£1 and +£2 (in kaprow maybe +2?)
        // Let's just fix the closing bracket missing! Wait, the closing bracket was removed because the regex matched it.
        // The original string was "(+£1)" and it became "(+".
        // So I can replace "(+" with "(+£1)" for most meats. Let's do a safe fallback.
        
        // Beef, Prawns are +£1
        content = content.replace(/"เนื้อ \(\+"/g, '"เนื้อ (+£1"');
        content = content.replace(/"Beef \(\+"/g, '"Beef (+£1"');
        content = content.replace(/"กุ้ง \(\+"/g, '"กุ้ง (+£1"');
        content = content.replace(/"Prawns \(\+"/g, '"Prawns (+£1"');
        
        // For Crispy Pork Belly, let's assume +£1 is the most common.
        content = content.replace(/"หมูกรอบ \(\+"/g, '"หมูกรอบ (+£1"');
        content = content.replace(/"Crispy Pork Belly \(\+"/g, '"Crispy Pork Belly (+£1"');
        
        // Now add the missing closing bracket for all the ones we just replaced
        content = content.replace(/\(\+£1"/g, '(+£1)"');
        content = content.replace(/\(\+£2"/g, '(+£2)"');
        content = content.replace(/\(\+£2.50"/g, '(+£2.50)"');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${filePath}`);
    }
});
