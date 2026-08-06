const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
    try {
        console.log('Testing API key...');
        const genAI = new GoogleGenerativeAI('AQ.Ab8RN6LAStz4TMKjMzQo0sCZuiEIYbJVFMsurT7a3FkQznRGeQ');
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        console.log('Sending request...');
        const result = await model.generateContent("Say hi");
        const response = await result.response;
        console.log('SUCCESS! Response:', response.text());
    } catch (err) {
        console.error('FAILED:', err.message);
        console.error('Full error:', JSON.stringify(err, null, 2));
    }
}

test();
