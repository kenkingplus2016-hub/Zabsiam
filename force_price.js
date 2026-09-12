const fs = require('fs');

let html = fs.readFileSync('public/delivery.html', 'utf8');

// Replace standard displays &pound;XX.00
const toReplace = [
  { id: 'delivery-1', price: 26 },
  { id: 'delivery-2', price: 26 },
  { id: 'delivery-3', price: 45 },
  { id: 'delivery-4', price: 26 },
  { id: 'delivery-5', price: 35 },
  { id: 'delivery-7', price: 35 },
  { id: 'delivery-8', price: 35 }
];

toReplace.forEach(item => {
  // Find the block starting with id: 'ITEM_ID'
  // Since HTML structure is consistent, we can just replace the specific cart payload:
  // addToCart({id: 'delivery-1', name: '...', price: 35.0,
  const cartRegex = new RegExp(`addToCart\\(\\{id: '${item.id}', name: '([^']+)', price: [\\d\\.]+,`);
  html = html.replace(cartRegex, `addToCart({id: '${item.id}', name: '$1', price: ${item.price.toFixed(1)},`);

  // Now we need to update the display price. It's immediately preceding the 'Add to Order' button.
  // This is tricky with regex, let's just find the index of the cart button and replace the last occurrence of &pound;XX.00
  let index = html.indexOf(`addToCart({id: '${item.id}'`);
  if (index !== -1) {
    let beforeCart = html.substring(0, index);
    let afterCart = html.substring(index);
    // Find the last &pound;... before the cart button
    let lastPound = beforeCart.lastIndexOf('&pound;');
    if (lastPound !== -1) {
       let endOfSpan = beforeCart.indexOf('</span>', lastPound);
       beforeCart = beforeCart.substring(0, lastPound) + `&pound;${item.price.toFixed(2)}` + beforeCart.substring(endOfSpan);
       html = beforeCart + afterCart;
    }
  }
});

fs.writeFileSync('public/delivery.html', html, 'utf8');
console.log('Prices completely fixed');
