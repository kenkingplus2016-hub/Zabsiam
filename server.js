const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const AI_TASKS_FILE = path.join(DATA_DIR, 'ai_team_tasks.json');
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

const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

    if (requestUrl.pathname.startsWith('/api/ai-team-tasks')) {
        handleAiTeamTasks(request, response, requestUrl.pathname).catch(error => {
            console.error('AI team task API error:', error);
            sendJson(response, 400, { error: error.message || 'Bad request.' });
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
