const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public'
];

const newHeader = `<header class="mega-header">
    <div class="mega-nav-container">
        <a href="index.html" class="mega-logo">
            <img src="logo.png" alt="KHRUA THAI">
            KHRUA THAI
        </a>
        
        <div class="mega-nav-links">
            <!-- Main Meals -->
            <div class="mega-nav-item">
                <a href="menu.html" class="mega-nav-link">Main Meals</a>
                <div class="mega-dropdown">
                    <div class="mega-dropdown-content">
                        <div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">By Protein</div>
                                <a href="menu.html">Chicken Meals</a>
                                <a href="menu.html">Beef Meals</a>
                                <a href="menu.html">Pork Meals</a>
                                <a href="menu.html">Seafood</a>
                            </div>
                            <div class="mega-column">
                                <div class="mega-column-title">Vegetarian & Vegan</div>
                                <a href="menu.html">All Vegetarian</a>
                                <a href="menu.html">Vegan Meals</a>
                            </div>
                        </div>
                        <div class="mega-featured">
                            <a href="menu.html" class="mega-feature-card">
                                <img src="images/green_curry_pork_bowl.jpg" alt="Green Curry">
                                <span>Authentic Thai Curries</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Entertaining -->
            <div class="mega-nav-item">
                <a href="menu.html" class="mega-nav-link">Entertaining</a>
                <div class="mega-dropdown">
                    <div class="mega-dropdown-content">
                        <div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">Event Types</div>
                                <a href="menu.html">Canapés</a>
                                <a href="menu.html">Dinner Party</a>
                                <a href="menu.html">Afternoon Tea</a>
                                <a href="menu.html">Buffet</a>
                                <a href="menu.html">Birthday Party</a>
                            </div>
                        </div>
                        <div class="mega-featured">
                            <a href="menu.html" class="mega-feature-card">
                                <img src="images/780f7b8bb98d.jpg" alt="Entertaining">
                                <span>Premium Event Catering</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Puddings -->
            <div class="mega-nav-item">
                <a href="desserts.html" class="mega-nav-link">Puddings</a>
                <div class="mega-dropdown">
                    <div class="mega-dropdown-content">
                        <div class="mega-columns">
                            <div class="mega-column">
                                <div class="mega-column-title">Thai Desserts</div>
                                <a href="desserts.html">Coconut Jelly</a>
                                <a href="desserts.html">Mango Sticky Rice</a>
                                <a href="desserts.html">Traditional Sweets</a>
                            </div>
                        </div>
                        <div class="mega-featured">
                            <a href="desserts.html" class="mega-feature-card">
                                <img src="images/Butterfly Pea Coconut Jelly with Young Coconut.jpg" alt="Puddings">
                                <span>Delightful Thai Puddings</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Meal Boxes -->
            <div class="mega-nav-item">
                <a href="delivery.html" class="mega-nav-link">Meal Boxes</a>
            </div>

            <!-- Summer Meals -->
            <div class="mega-nav-item">
                <a href="menu.html" class="mega-nav-link">Summer Meals</a>
            </div>
        </div>

        <div class="mega-search">
            <input type="text" placeholder="Search for Meals...">
            <i class="fas fa-search"></i>
        </div>

        <div class="mega-icons">
            <a href="booking.html" class="mega-icon-btn">
                <i class="fas fa-shopping-cart"></i>
                <span id="nav-cart-badge-inner" class="mega-cart-badge" style="display:none;">0</span>
            </a>
        </div>
    </div>
</header>`;

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace <header>...</header>
        // Note: For index.html it's just <header> ... </header>. For menu.html it might have classes.
        const headerRegex = /<header[^>]*>[\s\S]*?<\/header>/i;
        if (headerRegex.test(content)) {
            content = content.replace(headerRegex, newHeader);
            modified = true;
        }

        // Add CSS link if not exists
        if (!content.includes('megamenu.css')) {
            content = content.replace('</head>', '    <link rel="stylesheet" href="css/megamenu.css">\n</head>');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected mega menu into ${file} in ${dir}`);
        }
    });
});
