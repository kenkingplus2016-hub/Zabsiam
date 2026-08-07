const http = require('http');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const AI_TASKS_FILE = path.join(DATA_DIR, 'ai_team_tasks.json');
const TEMP_CHECKS_FILE = path.join(DATA_DIR, 'temperature_checks.json');
const FOOD_SAFETY_FILE = path.join(DATA_DIR, 'food_safety_records.json');
const ADMIN_PASSWORD = process.env.ZABSIAM_ADMIN_PASSWORD || 'ZabSiam@2026';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
    });
    response.end(JSON.stringify(payload));
}

function readJsonFile(filePath, fallback) {
    try {
        if (!fs.existsSync(filePath)) {
            return fallback;
        }
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error(`Could not read ${filePath}:`, error);
        return fallback;
    }
}

function writeJsonFile(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function readRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = '';

        request.on('data', chunk => {
            body += chunk;
            if (body.length > 1000000) {
                reject(new Error('Request body is too large.'));
                request.destroy();
            }
        });

        request.on('end', () => {
            if (!body.trim()) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Invalid JSON body.'));
            }
        });

        request.on('error', reject);
    });
}

function isAdminRequest(request) {
    return request.headers['x-zabsiam-admin-pass'] === ADMIN_PASSWORD;
}

function makeTaskId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function makeRecordId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function classifyTemperature(type, temperature) {
    const temp = Number(temperature);
    if (!Number.isFinite(temp)) {
        return { status: 'fail', label: 'Invalid', guidance: 'Enter a valid temperature.' };
    }

    if (type === 'chilled') {
        if (temp <= 5) return { status: 'pass', label: 'Safe', guidance: 'Chilled food is within the 0-5°C target.' };
        if (temp < 8) return { status: 'warning', label: 'Warning', guidance: 'Above the 5°C target. Check again and adjust the fridge.' };
        return { status: 'fail', label: 'Action needed', guidance: 'Cold food must be kept below 8°C. Move food, check equipment, and record action.' };
    }

    if (type === 'frozen') {
        if (temp <= -18) return { status: 'pass', label: 'Safe', guidance: 'Frozen storage is at -18°C or below.' };
        if (temp <= -15) return { status: 'warning', label: 'Warning', guidance: 'Freezer is warmer than target. Check door, load, and settings.' };
        return { status: 'fail', label: 'Action needed', guidance: 'Freezer temperature is too warm. Check food condition and equipment.' };
    }

    if (type === 'hot-holding') {
        if (temp >= 63) return { status: 'pass', label: 'Safe', guidance: 'Hot holding is at or above 63°C.' };
        return { status: 'fail', label: 'Action needed', guidance: 'Hot food below 63°C must be served within 2 hours, reheated, chilled quickly, or discarded.' };
    }

    if (type === 'cooked' || type === 'reheated') {
        if (temp >= 75) return { status: 'pass', label: 'Safe', guidance: 'Core temperature is at least 75°C.' };
        if (temp >= 70) return { status: 'warning', label: 'Check time', guidance: '70°C can be safe if held for 2 minutes. Record holding time.' };
        return { status: 'fail', label: 'Action needed', guidance: 'Continue cooking/reheating until piping hot and safely cooked.' };
    }

    if (type === 'delivery') {
        if (temp <= 5) return { status: 'pass', label: 'Safe chilled delivery', guidance: 'Chilled delivery is within the 0-5°C target.' };
        if (temp < 8) return { status: 'warning', label: 'Warning', guidance: 'Chilled delivery is above target but below legal limit. Check supplier and record action.' };
        return { status: 'fail', label: 'Reject/check delivery', guidance: 'Chilled delivery is above 8°C. Consider rejecting affected high-risk food.' };
    }

    return { status: 'warning', label: 'Recorded', guidance: 'Temperature recorded. Check against your food safety procedure.' };
}

async function handleAiTeamTasks(request, response, pathname) {
    if (!isAdminRequest(request)) {
        sendJson(response, 401, { error: 'Unauthorized' });
        return;
    }

    const tasks = readJsonFile(AI_TASKS_FILE, []);

    if (request.method === 'GET' && pathname === '/api/ai-team-tasks') {
        sendJson(response, 200, { tasks });
        return;
    }

    if (request.method === 'POST' && pathname === '/api/ai-team-tasks') {
        const body = await readRequestBody(request);
        const now = new Date().toISOString();
        const title = String(body.title || '').trim();

        if (!title) {
            sendJson(response, 400, { error: 'Task title is required.' });
            return;
        }

        const task = {
            id: makeTaskId(),
            title,
            role: String(body.role || 'Personal Secretary AI').trim(),
            priority: String(body.priority || 'normal').trim(),
            status: 'todo',
            note: String(body.note || '').trim(),
            sourceDevice: String(body.sourceDevice || '').trim(),
            createdAt: now,
            updatedAt: now
        };

        tasks.unshift(task);
        writeJsonFile(AI_TASKS_FILE, tasks);
        sendJson(response, 201, { task, tasks });
        return;
    }

    const taskMatch = pathname.match(/^\/api\/ai-team-tasks\/([^/]+)$/);
    if (taskMatch && request.method === 'PATCH') {
        const body = await readRequestBody(request);
        const task = tasks.find(item => item.id === taskMatch[1]);

        if (!task) {
            sendJson(response, 404, { error: 'Task not found.' });
            return;
        }

        ['title', 'role', 'priority', 'status', 'note'].forEach(field => {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                task[field] = String(body[field] || '').trim();
            }
        });
        task.updatedAt = new Date().toISOString();

        writeJsonFile(AI_TASKS_FILE, tasks);
        sendJson(response, 200, { task, tasks });
        return;
    }

    if (taskMatch && request.method === 'DELETE') {
        const nextTasks = tasks.filter(item => item.id !== taskMatch[1]);
        writeJsonFile(AI_TASKS_FILE, nextTasks);
        sendJson(response, 200, { tasks: nextTasks });
        return;
    }

    sendJson(response, 405, { error: 'Method not allowed.' });
}

async function handleTemperatureChecks(request, response, pathname) {
    if (!isAdminRequest(request)) {
        sendJson(response, 401, { error: 'Unauthorized' });
        return;
    }

    const checks = readJsonFile(TEMP_CHECKS_FILE, []);

    if (request.method === 'GET' && pathname === '/api/temperature-checks') {
        sendJson(response, 200, { checks });
        return;
    }

    if (request.method === 'POST' && pathname === '/api/temperature-checks') {
        const body = await readRequestBody(request);
        const now = new Date().toISOString();
        const type = String(body.type || '').trim();
        const area = String(body.area || '').trim();
        const item = String(body.item || '').trim();
        const temperature = Number(body.temperature);

        if (!type || !area || !item || !Number.isFinite(temperature)) {
            sendJson(response, 400, { error: 'Type, area, item, and temperature are required.' });
            return;
        }

        const result = classifyTemperature(type, temperature);
        const check = {
            id: makeRecordId(),
            type,
            area,
            item,
            temperature,
            unit: 'C',
            status: result.status,
            label: result.label,
            guidance: result.guidance,
            checkedBy: String(body.checkedBy || '').trim(),
            correctiveAction: String(body.correctiveAction || '').trim(),
            note: String(body.note || '').trim(),
            createdAt: now,
            updatedAt: now
        };

        checks.unshift(check);
        writeJsonFile(TEMP_CHECKS_FILE, checks.slice(0, 1000));
        sendJson(response, 201, { check, checks: checks.slice(0, 1000) });
        return;
    }

    const checkMatch = pathname.match(/^\/api\/temperature-checks\/([^/]+)$/);
    if (checkMatch && request.method === 'PATCH') {
        const body = await readRequestBody(request);
        const check = checks.find(item => item.id === checkMatch[1]);

        if (!check) {
            sendJson(response, 404, { error: 'Temperature check not found.' });
            return;
        }

        ['area', 'item', 'checkedBy', 'correctiveAction', 'note'].forEach(field => {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                check[field] = String(body[field] || '').trim();
            }
        });
        if (Object.prototype.hasOwnProperty.call(body, 'type')) check.type = String(body.type || '').trim();
        if (Object.prototype.hasOwnProperty.call(body, 'temperature')) {
            const temperature = Number(body.temperature);
            if (!Number.isFinite(temperature)) {
                sendJson(response, 400, { error: 'Temperature must be a number.' });
                return;
            }
            check.temperature = temperature;
        }

        const result = classifyTemperature(check.type, check.temperature);
        check.status = result.status;
        check.label = result.label;
        check.guidance = result.guidance;
        check.updatedAt = new Date().toISOString();

        writeJsonFile(TEMP_CHECKS_FILE, checks);
        sendJson(response, 200, { check, checks });
        return;
    }

    if (checkMatch && request.method === 'DELETE') {
        const nextChecks = checks.filter(item => item.id !== checkMatch[1]);
        writeJsonFile(TEMP_CHECKS_FILE, nextChecks);
        sendJson(response, 200, { checks: nextChecks });
        return;
    }

    sendJson(response, 405, { error: 'Method not allowed.' });
}

async function handleFoodSafetyRecords(request, response, pathname) {
    if (!isAdminRequest(request)) {
        sendJson(response, 401, { error: 'Unauthorized' });
        return;
    }

    const records = readJsonFile(FOOD_SAFETY_FILE, []);

    if (request.method === 'GET' && pathname === '/api/food-safety-records') {
        sendJson(response, 200, { records });
        return;
    }

    if (request.method === 'POST' && pathname === '/api/food-safety-records') {
        const body = await readRequestBody(request);
        const now = new Date().toISOString();
        const module = String(body.module || '').trim();
        const title = String(body.title || '').trim();

        if (!module || !title) {
            sendJson(response, 400, { error: 'Module and title are required.' });
            return;
        }

        const record = {
            id: makeRecordId(),
            module,
            title,
            category: String(body.category || '').trim(),
            status: String(body.status || 'done').trim(),
            risk: String(body.risk || 'low').trim(),
            assignedTo: String(body.assignedTo || '').trim(),
            completedBy: String(body.completedBy || '').trim(),
            dueDate: String(body.dueDate || '').trim(),
            details: String(body.details || '').trim(),
            correctiveAction: String(body.correctiveAction || '').trim(),
            createdAt: now,
            updatedAt: now
        };

        records.unshift(record);
        writeJsonFile(FOOD_SAFETY_FILE, records.slice(0, 2000));
        sendJson(response, 201, { record, records: records.slice(0, 2000) });
        return;
    }

    const recordMatch = pathname.match(/^\/api\/food-safety-records\/([^/]+)$/);
    if (recordMatch && request.method === 'PATCH') {
        const body = await readRequestBody(request);
        const record = records.find(item => item.id === recordMatch[1]);

        if (!record) {
            sendJson(response, 404, { error: 'Food safety record not found.' });
            return;
        }

        ['module', 'title', 'category', 'status', 'risk', 'assignedTo', 'completedBy', 'dueDate', 'details', 'correctiveAction'].forEach(field => {
            if (Object.prototype.hasOwnProperty.call(body, field)) {
                record[field] = String(body[field] || '').trim();
            }
        });
        record.updatedAt = new Date().toISOString();

        writeJsonFile(FOOD_SAFETY_FILE, records);
        sendJson(response, 200, { record, records });
        return;
    }

    if (recordMatch && request.method === 'DELETE') {
        const nextRecords = records.filter(item => item.id !== recordMatch[1]);
        writeJsonFile(FOOD_SAFETY_FILE, nextRecords);
        sendJson(response, 200, { records: nextRecords });
        return;
    }

    sendJson(response, 405, { error: 'Method not allowed.' });
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'dummy-key' }); // Initialize with dummy to prevent crash on boot if env is missing

async function handleChatApi(request, response) {
    if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed.' });
        return;
    }

    try {
        if (process.env.OPENAI_API_KEY === undefined || process.env.OPENAI_API_KEY === '') {
            sendJson(response, 500, { error: 'OpenAI API Key is not configured on the server.' });
            return;
        }

        const body = await readRequestBody(request);
        const userMessage = String(body.message || '').trim();

        if (!userMessage) {
            sendJson(response, 400, { error: 'Message is required.' });
            return;
        }

        const systemPrompt = `You are a polite, helpful AI sales assistant for ZabSiam, a premium authentic Thai catering service.
Your goal is to answer customer queries and CLOSE THE SALE.
Ask the customer for the following details to confirm a booking:
1. Name
2. Contact (Phone/Email)
3. Event Date
4. Number of Guests
5. Package & Menu Choices
Once you have ALL these details and the customer confirms they want to book, you MUST append the following JSON block at the very end of your message:
[ORDER_CONFIRMED]
{"name": "...", "contact": "...", "date": "...", "guests": "...", "package": "..."}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
        });

        let reply = completion.choices[0].message.content;
        
        if (reply.includes('[ORDER_CONFIRMED]')) {
            const parts = reply.split('[ORDER_CONFIRMED]');
            const userReply = parts[0].trim();
            const jsonPart = parts[1].trim();
            try {
                const orderData = JSON.parse(jsonPart);
                orderData.id = makeRecordId();
                orderData.createdAt = new Date().toISOString();
                
                const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
                const orders = readJsonFile(ORDERS_FILE, []);
                orders.unshift(orderData);
                writeJsonFile(ORDERS_FILE, orders);
                
                reply = userReply + "\n\n(✅ Your order has been securely sent to our team. We will be in touch shortly!)";
            } catch(e) {
                console.error("Failed to parse order JSON:", e);
                reply = userReply;
            }
        }

        sendJson(response, 200, { reply });
    } catch (error) {
        console.error('OpenAI API error:', error);
        sendJson(response, 500, { error: 'Failed to process chat request.' });
    }
}

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

    if (requestUrl.pathname.startsWith('/api/ai-team-tasks')) {
        handleAiTeamTasks(request, response, requestUrl.pathname).catch(error => {
            console.error('AI team task API error:', error);
            sendJson(response, 400, { error: error.message || 'Bad request.' });
        });
        return;
    }

    if (requestUrl.pathname.startsWith('/api/food-safety-records')) {
        handleFoodSafetyRecords(request, response, requestUrl.pathname).catch(error => {
            console.error('Food safety API error:', error);
            sendJson(response, 400, { error: error.message || 'Bad request.' });
        });
        return;
    }

    if (requestUrl.pathname.startsWith('/api/temperature-checks')) {
        handleTemperatureChecks(request, response, requestUrl.pathname).catch(error => {
            console.error('Temperature check API error:', error);
            sendJson(response, 400, { error: error.message || 'Bad request.' });
        });
        return;
    }

    if (requestUrl.pathname.startsWith('/api/chat')) {
        handleChatApi(request, response).catch(error => {
            console.error('Chat API error:', error);
            sendJson(response, 500, { error: error.message || 'Server error.' });
        });
        return;
    }

    let filePath = '.' + decodeURIComponent(request.url);
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Ignore query params
    filePath = filePath.split('?')[0];
    
    // Map to public dir
    filePath = path.join(PUBLIC_DIR, filePath.replace('./', ''));

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end('404 Not Found', 'utf-8');
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
