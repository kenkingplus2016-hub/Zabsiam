const https = require('https');

https.get('https://khruathailondon.co.uk/ai-chatbot.js', (res) => {
  if (res.statusCode === 200) {
    console.log('SUCCESS: File is live on the server!');
  } else {
    console.log(`FAIL: File is NOT live (Status: ${res.statusCode})`);
  }
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
