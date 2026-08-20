const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT || 8080);
const HOST = '0.0.0.0';
const PUBLIC_DIR = path.join(__dirname, 'public');
const OPENAPI_FILE = path.join(__dirname, 'gpt_action_schema.json');
const GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v26.0';
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;
const MAX_BODY_BYTES = 1024 * 1024;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml', '.wav': 'audio/wav',
    '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf'
};

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, openai-conversation-id, openai-ephemeral-user-id',
    'Access-Control-Max-Age': '86400'
};

function sendJson(response, status, payload) {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders });
    response.end(JSON.stringify(payload));
}

function safeEqual(left, right) {
    const a = Buffer.from(left || '');
    const b = Buffer.from(right || '');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function authorize(request, response) {
    const expected = process.env.GPT_ACTION_API_KEY;
    if (!expected) {
        sendJson(response, 503, { error: 'GPT_ACTION_API_KEY is not configured' });
        return false;
    }
    const supplied = (request.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!safeEqual(supplied, expected)) {
        sendJson(response, 401, { error: 'Unauthorized' });
        return false;
    }
    return true;
}

function requireMetaConfig(response) {
    if (!process.env.META_PAGE_ACCESS_TOKEN || !process.env.META_PAGE_ID) {
        sendJson(response, 503, { error: 'META_PAGE_ACCESS_TOKEN or META_PAGE_ID is not configured' });
        return false;
    }
    return true;
}

function readJson(request) {
    return new Promise((resolve, reject) => {
        let raw = '';
        request.on('data', chunk => {
            raw += chunk;
            if (Buffer.byteLength(raw) > MAX_BODY_BYTES) {
                reject(Object.assign(new Error('Request body is too large'), { status: 413 }));
                request.destroy();
            }
        });
        request.on('end', () => {
            if (!raw) return resolve({});
            try { resolve(JSON.parse(raw)); }
            catch { reject(Object.assign(new Error('Invalid JSON body'), { status: 400 })); }
        });
        request.on('error', reject);
    });
}

async function graphRequest(endpoint, { method = 'GET', query = {}, body } = {}) {
    const url = new URL(`${GRAPH_BASE}/${String(endpoint).replace(/^\/+/, '')}`);
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
    });
    url.searchParams.set('access_token', process.env.META_PAGE_ACCESS_TOKEN);
    const options = { method, headers: {} };
    if (body !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    const result = await fetch(url, options);
    const text = await result.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
    if (!result.ok) {
        const error = new Error(data?.error?.message || `Meta Graph API returned ${result.status}`);
        error.status = result.status;
        error.metaCode = data?.error?.code;
        throw error;
    }
    return data;
}

function required(body, fields) {
    const missing = fields.filter(field => body[field] === undefined || body[field] === null || body[field] === '');
    if (missing.length) throw Object.assign(new Error(`Missing required field(s): ${missing.join(', ')}`), { status: 400 });
}

async function handleApi(request, response, url) {
    if (!authorize(request, response) || !requireMetaConfig(response)) return;
    const pageId = process.env.META_PAGE_ID;
    const parts = url.pathname.split('/').filter(Boolean).map(decodeURIComponent);
    const body = ['POST', 'PATCH', 'DELETE'].includes(request.method) ? await readJson(request) : {};

    if (request.method === 'GET' && url.pathname === '/api/page') {
        return sendJson(response, 200, await graphRequest(pageId, { query: { fields: 'id,name,link,about,category,followers_count,fan_count' } }));
    }
    if (request.method === 'GET' && url.pathname === '/api/posts') {
        const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 10), 1), 50);
        const data = await graphRequest(`${pageId}/published_posts`, { query: { fields: 'id,message,created_time,permalink_url,shares,reactions.limit(0).summary(true),comments.limit(0).summary(true)', limit } });
        return sendJson(response, 200, data);
    }
    if (request.method === 'POST' && url.pathname === '/api/posts') {
        required(body, ['message']);
        const endpoint = body.imageUrl ? `${pageId}/photos` : `${pageId}/feed`;
        const payload = body.imageUrl ? { message: body.message, url: body.imageUrl, published: true } : { message: body.message };
        return sendJson(response, 200, await graphRequest(endpoint, { method: 'POST', body: payload }));
    }
    if (request.method === 'DELETE' && parts.length === 3 && parts[1] === 'posts') {
        return sendJson(response, 200, await graphRequest(parts[2], { method: 'DELETE' }));
    }
    if (request.method === 'GET' && parts.length === 4 && parts[1] === 'posts' && parts[3] === 'comments') {
        const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 25), 1), 100);
        const data = await graphRequest(`${parts[2]}/comments`, { query: { fields: 'id,message,created_time,from,can_hide,can_remove,like_count', limit } });
        return sendJson(response, 200, data);
    }
    if (request.method === 'POST' && parts.length === 4 && parts[1] === 'comments' && parts[3] === 'replies') {
        required(body, ['message']);
        return sendJson(response, 200, await graphRequest(`${parts[2]}/comments`, { method: 'POST', body: { message: body.message } }));
    }
    if (request.method === 'PATCH' && parts.length === 3 && parts[1] === 'comments') {
        required(body, ['is_hidden']);
        return sendJson(response, 200, await graphRequest(parts[2], { method: 'POST', body: { is_hidden: Boolean(body.is_hidden) } }));
    }
    if (request.method === 'DELETE' && parts.length === 3 && parts[1] === 'comments') {
        return sendJson(response, 200, await graphRequest(parts[2], { method: 'DELETE' }));
    }
    if (request.method === 'GET' && url.pathname === '/api/conversations') {
        const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 20), 1), 50);
        const data = await graphRequest(`${pageId}/conversations`, { query: { fields: 'id,updated_time,unread_count,participants', limit } });
        return sendJson(response, 200, data);
    }
    if (request.method === 'GET' && parts.length === 4 && parts[1] === 'conversations' && parts[3] === 'messages') {
        const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 20), 1), 50);
        const data = await graphRequest(`${parts[2]}/messages`, { query: { fields: 'id,message,created_time,from,to', limit } });
        return sendJson(response, 200, data);
    }
    if (request.method === 'POST' && url.pathname === '/api/messages') {
        required(body, ['recipientId', 'message']);
        const payload = { recipient: { id: body.recipientId }, messaging_type: 'RESPONSE', message: { text: body.message } };
        return sendJson(response, 200, await graphRequest(`${pageId}/messages`, { method: 'POST', body: payload }));
    }
    if (request.method === 'GET' && url.pathname === '/api/insights') {
        const metric = url.searchParams.get('metric') || 'page_impressions,page_post_engagements';
        const period = url.searchParams.get('period') || 'day';
        const data = await graphRequest(`${pageId}/insights`, { query: { metric, period } });
        return sendJson(response, 200, data);
    }
    sendJson(response, 404, { error: 'API route not found' });
}

function serveStatic(request, response, url) {
    const relative = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const filePath = path.resolve(PUBLIC_DIR, relative);
    if (filePath !== PUBLIC_DIR && !filePath.startsWith(`${PUBLIC_DIR}${path.sep}`)) return sendJson(response, 403, { error: 'Forbidden' });
    fs.readFile(filePath, (error, content) => {
        if (error) return sendJson(response, error.code === 'ENOENT' ? 404 : 500, { error: error.code === 'ENOENT' ? 'Not found' : 'Server error' });
        const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': contentType, ...corsHeaders });
        response.end(content);
    });
}

const server = http.createServer(async (request, response) => {
    try {
        if (request.method === 'OPTIONS') { response.writeHead(204, corsHeaders); return response.end(); }
        const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
        if (request.method === 'GET' && url.pathname === '/health') return sendJson(response, 200, { ok: true, service: 'zabsiam-meta-api', graphVersion: GRAPH_VERSION });
        if (request.method === 'GET' && url.pathname === '/openapi.json') {
            const schema = JSON.parse(fs.readFileSync(OPENAPI_FILE, 'utf8'));
            const publicBaseUrl = process.env.PUBLIC_BASE_URL || `https://${request.headers.host}`;
            schema.servers = [{ url: publicBaseUrl.replace(/\/$/, '') }];
            return sendJson(response, 200, schema);
        }
        if (url.pathname.startsWith('/api/')) return await handleApi(request, response, url);
        return serveStatic(request, response, url);
    } catch (error) {
        console.error(error);
        const status = Number(error.status) || 500;
        return sendJson(response, status, { error: error.message || 'Server error', ...(error.metaCode ? { metaCode: error.metaCode } : {}) });
    }
});

server.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));
