const https = require('https');

const data = JSON.stringify({
  custName: 'Test',
  custPhone: '123',
  custEmail: 'test@test.com',
  eventDate: '2026-07-01',
  eventPlace: 'London',
  custAddress: 'London',
  menuSet: 'Test Menu',
  paymentMethod: 'Card',
  totalAmount: 100,
  category: 'Classic',
  totalSets: 1
});

const options = {
  hostname: 'khruathailondon.co.uk',
  port: 443,
  path: '/api/create-checkout-session',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', d => { body += d; });
  res.on('end', () => { console.log('Response:', body); });
});

req.on('error', error => { console.error('Error:', error); });
req.write(data);
req.end();
