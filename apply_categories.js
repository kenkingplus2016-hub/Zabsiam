const fs = require('fs');
const path = require('path');

const dirs = [
    'C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public',
    'C:\\Users\\KENDEE\\Desktop\\เว็บ\\public'
];

const indexNavLinks = `            <a href="menu.html">Main Meals</a>
            <a href="menu.html">Entertaining</a>
            <a href="desserts.html">Puddings</a>
            <a href="delivery.html">Meal Boxes</a>
            <a href="menu.html">Summer Meals</a>
            <a href="booking.html" id="nav-booking" class="book-now-btn" style="position:relative; padding-right:15px; display:inline-flex; align-items:center;">
            <i class="fas fa-shopping-cart" style="font-size: 1.3rem;"></i>
            <span id="nav-cart-badge-inner" style="position:absolute; top:-8px; right:-5px; background:#FF3B30; color:white; font-size:0.75rem; width:20px; height:20px; border-radius:50%; display:none; align-items:center; justify-content:center; font-weight:bold; border:2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">0</span>
        </a>`;

const indexGrid = `    <section class="categories-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <a href="menu.html" class="category-card">
            <img src="images/green_curry_pork_bowl.jpg" alt="Main Meals">
            <div class="category-text">
                <div class="category-title">Main Meals</div>
                <div class="category-subtitle">Hearty and authentic Thai dishes</div>
            </div>
        </a>
        <a href="menu.html" class="category-card">
            <img src="images/780f7b8bb98d.jpg" alt="Entertaining">
            <div class="category-text">
                <div class="category-title">Entertaining</div>
                <div class="category-subtitle">Perfect for your special events and gatherings</div>
            </div>
        </a>
        <a href="desserts.html" class="category-card">
            <img src="images/Butterfly Pea Coconut Jelly with Young Coconut.jpg" alt="Puddings">
            <div class="category-text">
                <div class="category-title">Puddings</div>
                <div class="category-subtitle">Delightful traditional Thai sweets</div>
            </div>
        </a>
        <a href="delivery.html" class="category-card">
            <img src="images/Red Curry beef pkg.jpg" alt="Meal Boxes">
            <div class="category-text">
                <div class="category-title">Meal Boxes</div>
                <div class="category-subtitle">Convenient, premium meals delivered to you</div>
            </div>
        </a>
        <a href="menu.html" class="category-card">
            <img src="images/Som Tum Thai.jpg" alt="Summer Meals">
            <div class="category-text">
                <div class="category-title">Summer Meals</div>
                <div class="category-subtitle">Fresh, vibrant, and refreshing flavors</div>
            </div>
        </a>
    </section>`;

const menuNavLinks = `            <a href="#" class="nav-link">Canapés</a>
            <a href="#" class="nav-link">Dinner Party</a>
            <a href="#" class="nav-link">Afternoon Tea</a>
            <a href="#" class="nav-link active">Buffet</a>
            <a href="#" class="nav-link">Birthday Party</a>`;

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    // Process index.html
    const indexFile = path.join(dir, 'index.html');
    if (fs.existsSync(indexFile)) {
        let content = fs.readFileSync(indexFile, 'utf8');
        
        // Replace header nav (the one before </nav>)
        const navRegex = /(<nav>)([\s\S]*?)(<\/nav>)/;
        if (navRegex.test(content)) {
            content = content.replace(navRegex, `$1\n${indexNavLinks}\n        $3`);
        }
        
        // Replace categories grid
        const gridRegex = /<section class="categories-grid"[\s\S]*?<\/section>/;
        if (gridRegex.test(content)) {
            content = content.replace(gridRegex, indexGrid);
        } else {
            const oldGridRegex = /<section class="categories-grid">[\s\S]*?<\/section>/;
            if (oldGridRegex.test(content)) {
                content = content.replace(oldGridRegex, indexGrid);
            }
        }
        
        fs.writeFileSync(indexFile, content, 'utf8');
        console.log('Updated index.html in ' + dir);
    }
    
    // Process menu.html
    const menuFile = path.join(dir, 'menu.html');
    if (fs.existsSync(menuFile)) {
        let content = fs.readFileSync(menuFile, 'utf8');
        
        // Replace #main-nav
        const mainNavRegex = /(<nav[^>]*id="main-nav"[^>]*>[\s\S]*?<div[^>]*>)([\s\S]*?)(<\/div>[\s\S]*?<\/nav>)/;
        if (mainNavRegex.test(content)) {
            content = content.replace(mainNavRegex, `$1\n${menuNavLinks}\n        $3`);
        }
        
        fs.writeFileSync(menuFile, content, 'utf8');
        console.log('Updated menu.html in ' + dir);
    }
});
