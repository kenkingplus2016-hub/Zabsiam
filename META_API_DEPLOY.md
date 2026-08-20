# Zab Siam Meta API deployment

## Render environment variables

In the existing Render service, open **Environment** and add:

- `META_PAGE_ID` — the Zab Siam Facebook Page ID.
- `META_PAGE_ACCESS_TOKEN` — the Page Access Token. Never commit this value.
- `GPT_ACTION_API_KEY` — a new random value of at least 32 characters.
- `META_GRAPH_VERSION` — `v26.0`.
- `PUBLIC_BASE_URL` — `https://zabsiam.com`.

Select **Save, rebuild, and deploy**. The server binds to `0.0.0.0` and Render's `PORT` automatically.

## Verify after deployment

- `https://zabsiam.com/health`
- `https://zabsiam.com/openapi.json`
- `https://zabsiam.com/privacy.html`

The health endpoint should return JSON with `"ok": true`.

## Configure the Custom GPT Action

1. Open **Configure → Actions → Create new action**.
2. Choose **Authentication → API Key → Bearer**.
3. Paste the same value used for `GPT_ACTION_API_KEY` into ChatGPT's secret field. Do not place it in the schema.
4. Import `https://zabsiam.com/openapi.json`.
5. Set Privacy Policy to `https://zabsiam.com/privacy.html`.
6. Test `getFacebookPage`, then `listFacebookPosts`.

Publishing, replying, hiding, and deleting are external side effects. The GPT should show the exact proposed action and obtain confirmation immediately before calling those operations. Messenger replies remain subject to Meta's messaging windows, opt-in rules, permissions, and App Review.
