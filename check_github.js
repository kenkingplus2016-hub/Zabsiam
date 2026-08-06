const https = require('https');

https.get('https://raw.githubusercontent.com/kenkingplus2016-hub/khruathai-london/main/public/success.html', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (data.includes('320218139')) {
      console.log('SUCCESS: Github has the change!');
    } else {
      console.log('FAIL: Github DOES NOT have the change.');
    }
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
