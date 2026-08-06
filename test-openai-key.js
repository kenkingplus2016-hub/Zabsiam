require('dotenv').config();
const { OpenAI } = require('openai');

async function test() {
    try {
        console.log('Testing OpenAI API key...');
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        console.log('Sending request...');
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Say hi' }],
        });

        console.log('SUCCESS! Response:', response.choices[0].message.content);
    } catch (err) {
        console.error('FAILED:', err.message);
    }
}

test();
