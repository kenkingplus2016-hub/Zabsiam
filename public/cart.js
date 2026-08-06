let cart = [];
const DEFAULT_DELIVERY_FEE = 5.00;

function getSelectedDeliveryOption() {
    const selected = document.querySelector('input[name="deliveryOption"]:checked');
    if (!selected) {
        return { label: 'Standard Delivery', fee: DEFAULT_DELIVERY_FEE };
    }

    const fee = Number(selected.dataset.fee);
    return {
        label: selected.dataset.label || 'Standard Delivery',
        fee: Number.isFinite(fee) ? fee : DEFAULT_DELIVERY_FEE
    };
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[char]));
}

function addToCart(name, price, img) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    updateCartUI();
    openCart();
}

function updateQty(index, change) {
    if (cart[index]) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const deliverySummaryLabel = document.getElementById('delivery-summary-label');
    const deliverySummaryFee = document.getElementById('delivery-summary-fee');
    const checkoutBtn = document.getElementById('checkout-btn');
    const deliveryOption = getSelectedDeliveryOption();
    
    let totalItems = 0;
    let subtotal = 0;
    let html = '';
    
    cart.forEach((item, index) => {
        totalItems += item.qty;
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}">
                <div class="cart-item-details">
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>£${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-qty">
                    <button type="button" onclick="updateQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button type="button" onclick="updateQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });
    
    if (cartCount) cartCount.innerText = totalItems;
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--color-light-gray); padding: 2rem 0;">Your cart is empty.</p>';
            if (checkoutBtn) checkoutBtn.disabled = true;
        } else {
            cartItems.innerHTML = html;
            if (checkoutBtn) checkoutBtn.disabled = false;
        }
    }
    
    const finalTotal = subtotal > 0 ? subtotal + deliveryOption.fee : 0;
    
    if (cartSubtotal) cartSubtotal.innerText = '£' + subtotal.toFixed(2);
    if (deliverySummaryLabel) deliverySummaryLabel.innerText = deliveryOption.label;
    if (deliverySummaryFee) deliverySummaryFee.innerText = '£' + deliveryOption.fee.toFixed(2);
    if (cartTotal) cartTotal.innerText = '£' + finalTotal.toFixed(2);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.classList.contains('active')) {
        closeCart();
    } else {
        openCart();
    }
}

function openCart() {
    document.getElementById('cart-modal').classList.add('active');
}

function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

async function proceedToCheckout(e) {
    e.preventDefault();
    if (cart.length === 0) return;
    
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const email = document.getElementById('custEmail').value;
    const address = document.getElementById('custAddress').value;
    const deliveryOption = getSelectedDeliveryOption();
    const selectedAllergies = Array.from(document.querySelectorAll('input[name="allergies"]:checked'))
        .map(input => input.value);
    const otherAllergies = document.getElementById('otherAllergies')?.value.trim() || '';
    const allergyDetails = [
        ...selectedAllergies,
        ...(otherAllergies ? [`Other: ${otherAllergies}`] : [])
    ];
    
    let menuSetDetails = "Postal Delivery Order:\n";
    let subtotal = 0;
    cart.forEach(item => {
        menuSetDetails += `- ${item.qty}x ${item.name} (£${item.price.toFixed(2)})\n`;
        subtotal += item.price * item.qty;
    });
    menuSetDetails += `Delivery Option: ${deliveryOption.label}\n`;
    menuSetDetails += `Delivery Fee: £${deliveryOption.fee.toFixed(2)}\n`;
    
    menuSetDetails += `Allergies: ${allergyDetails.length ? allergyDetails.join(', ') : 'None declared'}\n`;
    
    const finalTotal = subtotal + deliveryOption.fee;
    
    const payload = {
        custName: name,
        custPhone: phone,
        custEmail: email,
        eventDate: new Date().toISOString().split('T')[0], // placeholder
        eventPlace: 'Postal Delivery', // placeholder
        custAddress: address,
        menuSet: menuSetDetails,
        deliveryOption: deliveryOption.label,
        deliveryFee: deliveryOption.fee,
        allergies: allergyDetails.length ? allergyDetails.join(', ') : 'None declared',
        paymentMethod: 'Card',
        totalAmount: finalTotal,
        category: 'Dessert Delivery',
        totalSets: 1
    };

    const btn = document.getElementById('checkout-btn');
    const originalText = btn.innerText;
    btn.innerText = 'Processing...';
    btn.disabled = true;
    
    try {
        const response = await fetch('https://khruathailondon.co.uk/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('Checkout failed. Please try again.');
            btn.innerText = originalText;
            btn.disabled = false;
        }
    } catch (err) {
        console.error(err);
        alert('Error connecting to payment gateway.');
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="deliveryOption"]').forEach(input => {
        input.addEventListener('change', updateCartUI);
    });
    updateCartUI();
});

window.addToCart = addToCart;
window.updateQty = updateQty;
window.toggleCart = toggleCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.proceedToCheckout = proceedToCheckout;

