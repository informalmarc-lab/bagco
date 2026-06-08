# Bud Bags

Standalone Next.js app for budbags.net.

## Local development

```bash
npm install
npm run dev
```

The dev server runs on port 3152.

## Production

```bash
npm run build
PORT=3152 npm start
```

PM2 example:

```bash
pm2 start npm --name budbags -- start
```

Set SMTP environment variables before enabling live quote email delivery.
