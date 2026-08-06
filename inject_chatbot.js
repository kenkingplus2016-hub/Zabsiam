const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const targetFiles = ['index.html', 'menu.html', 'delivery.html', 'royal.html', 'booking.html'];

targetFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Prevent double injection
        if (!content.includes('ai-chatbot.css')) {
            // Inject CSS just before </head>
            content = content.replace('</head>', '    <link rel="stylesheet" href="ai-chatbot.css">\n</head>');
        }
        
        if (!content.includes('ai-chatbot.js')) {
            // Inject JS just before </body>
            content = content.replace('</body>', '    <script src="ai-chatbot.js"></script>\n</body>');
        }
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Injected into ${file}`);
    }
});
