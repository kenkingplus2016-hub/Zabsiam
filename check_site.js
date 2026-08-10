const https = require('https');

https.get('https://khruathailondon.co.uk/success.html', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (data.includes('320218139')) {
      console.log('SUCCESS: Bank info is updated!');
    } else {
      console.log('FAIL: Bank info not found in the live HTML.');
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
