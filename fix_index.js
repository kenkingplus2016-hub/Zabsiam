const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// The file got butchered. I will find where <header> ends and where "The Royal Siam Gathering" starts, and reconstruct the middle part.
const headerEnd = html.indexOf('</header>') + 9;
const royalSiamStart = html.indexOf('<!-- Item 2: The Royal Siam Gathering -->') || html.indexOf('<div class="category-title">The Royal Siam Gathering</div>');

// Let's just find "</header>" and the next part.
let firstPart = html.substring(0, headerEnd);
let lastPart = html.substring(html.indexOf('<div class="category-title">The Royal Siam Gathering</div>') - 200);

// reconstruct lastPart to be safe
lastPart = `
        <!-- Item 2: The Royal Siam Gathering -->
        <a href="royal.html" class="category-card">
            <img src="images/780f7b8bb98d.jpg" alt="The Royal Siam Gathering">
            <div class="category-text">
                <div class="category-title">The Royal Siam Gathering</div>
                <div class="category-subtitle">Premium elegance with authentic Royal Thai recipes</div>
            </div>
        </a>

        <!-- Item 3: Delivery Box Sets -->
        <a href="delivery.html" class="category-card">
            <img src="images/Lunch Box (Set A).jpg" alt="Delivery Box Sets">
            <div class="category-text">
                <div class="category-title">Delivery Box Sets</div>
                <div class="category-subtitle">Delicious and convenient, delivered straight to your door</div>
            </div>
        </a>

        <!-- Item 4: Private Catering -->
        <a href="booking.html" class="category-card">
            <img src="images/Butterfly Pea Coconut Jelly with Young Coconut.jpg" alt="Event Catering">
            <div class="category-text">
                <div class="category-title">Catering & Events</div>
                <div class="category-subtitle">Design your dream menu and party style exactly as you wish</div>
            </div>
        </a>
    </section>

    <footer>
        <img src="logo.png" alt="KHRUA THAI">
        <p>© 2026 KHRUA THAI LONDON. ALL RIGHTS RESERVED.</p>
    </footer>

    <script src="mobile-menu.js"></script>

<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a3fb7427e16581d479c0473/1js4e7nkp';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->

<!-- Messenger and LINE Floating Buttons -->
<div style="position: fixed; bottom: 25px; left: 25px; display: flex; flex-direction: column; gap: 15px; z-index: 9999;">
    <!-- Facebook Messenger -->
    <a href="https://m.me/61589177574118" target="_blank" class="chat-float fb-float">
        <i class="fab fa-facebook-messenger"></i>
    </a>
    <!-- LINE OA -->
    <a href="https://line.me/R/ti/p/@421ycvge" target="_blank" class="chat-float line-float">
        <i class="fab fa-line"></i>
    </a>
</div>

</body>
</html>
`;

const middlePart = `
    <section class="hero-banner">
        <h1>Catering Services for Weddings, Corporate Events, Birthdays & Parties</h1>
    </section>

    <section class="categories-grid">
        <!-- Item 1: Sri Siam Event & Buffet -->
        <a href="menu.html" class="category-card">
            <img src="images/the-signature.jpg" alt="Sri Siam Event & Buffet">
            <div class="category-text">
                <div class="category-title">Sri Siam Event & Buffet</div>
                <div class="category-subtitle">ศรีสยาม อีเว้น/บุฟเฟต์ - Customize your dream buffet menu</div>
            </div>
        </a>
`;

fs.writeFileSync('public/index.html', firstPart + middlePart + lastPart, 'utf8');
console.log("Restored index.html successfully.");
