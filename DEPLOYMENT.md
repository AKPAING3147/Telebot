# 🚀 Deployment Guide

This guide covers deploying your Telegram Movie Bot to various platforms.

## Table of Contents

- [Vercel (Recommended)](#vercel-recommended)
- [Railway](#railway)
- [Render](#render)
- [DigitalOcean App Platform](#digitalocean-app-platform)
- [Post-Deployment Steps](#post-deployment-steps)

---

## Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### Prerequisites

- GitHub account
- Vercel account (free) - [Sign up here](https://vercel.com/signup)

### Steps

1. **Push your code to GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Telegram Movie Bot"
   git branch -M main
   git remote add origin https://github.com/yourusername/telegram-movie-bot.git
   git push -u origin main
   ```

2. **Import project to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**:
   
   In the Vercel project settings, add these variables:
   
   ```
   BOT_TOKEN=your_bot_token_here
   TMDB_API_KEY=your_tmdb_api_key_here
   CHANNEL_USERNAME=@yourchannel
   WEBHOOK_URL=https://your-project.vercel.app
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your bot will be live at `https://your-project.vercel.app`

5. **Set up webhook**:
   
   Visit: `https://your-project.vercel.app/api/setup-webhook`

### Auto-Deployment

Every push to your `main` branch will automatically deploy to Vercel.

---

## Railway

Railway offers simple deployment with a generous free tier.

### Steps

1. **Create Railway account**: [railway.app](https://railway.app)

2. **Create new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add environment variables**:
   - Go to "Variables" tab
   - Add all required variables:
     ```
     BOT_TOKEN
     TMDB_API_KEY
     CHANNEL_USERNAME
     WEBHOOK_URL
     ```

4. **Deploy**:
   - Railway will automatically build and deploy
   - Get your app URL from the deployment

5. **Update WEBHOOK_URL**:
   - Update the `WEBHOOK_URL` variable with your Railway URL
   - Visit `/api/setup-webhook` to configure

---

## Render

Render provides free hosting for web services.

### Steps

1. **Create Render account**: [render.com](https://render.com)

2. **Create new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure**:
   - Name: `telegram-movie-bot`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Add environment variables**:
   - Scroll to "Environment Variables"
   - Add all required variables

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete

6. **Set up webhook**:
   - Visit your Render URL + `/api/setup-webhook`

---

## DigitalOcean App Platform

DigitalOcean App Platform offers managed app hosting.

### Steps

1. **Create DigitalOcean account**: [digitalocean.com](https://www.digitalocean.com)

2. **Create new App**:
   - Go to Apps → Create App
   - Choose GitHub as source
   - Select your repository

3. **Configure**:
   - App name: `telegram-movie-bot`
   - Environment: Auto-detected (Node.js)

4. **Add environment variables**:
   - Add all required variables in the Environment section

5. **Review and deploy**:
   - Review settings
   - Click "Create Resources"

6. **Set up webhook**:
   - Get your app URL
   - Visit `/api/setup-webhook`

---

## Post-Deployment Steps

After deploying to any platform, follow these steps:

### 1. Verify Deployment

Visit your deployed URL. You should see the homepage with bot status.

### 2. Configure Webhook

**Automatic Method**:
```
Visit: https://your-app-url.com/api/setup-webhook
```

**Manual Method**:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app-url.com/api/webhook"}'
```

### 3. Verify Webhook

**Check via API endpoint**:
```
Visit: https://your-app-url.com/api/setup-webhook
```

**Check via Telegram API**:
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

You should see:
```json
{
  "ok": true,
  "result": {
    "url": "https://your-app-url.com/api/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

### 4. Test the Bot

1. Open Telegram
2. Search for your bot
3. Send `/start`
4. Send a movie name (e.g., "Inception")
5. Click "Share to Channel"
6. Check your channel

### 5. Monitor Logs

Check your platform's logs to ensure everything is working:

- **Vercel**: Dashboard → Project → Logs
- **Railway**: Project → Deployments → Logs
- **Render**: Service → Logs
- **DigitalOcean**: App → Runtime Logs

---

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `BOT_TOKEN` | Yes | Telegram bot token from @BotFather | `1234567890:ABC...` |
| `TMDB_API_KEY` | Yes | TMDB API key | `abc123...` |
| `CHANNEL_USERNAME` | Yes | Telegram channel username | `@mychannel` |
| `WEBHOOK_URL` | Optional | Your deployed app URL | `https://mybot.vercel.app` |
| `NODE_ENV` | Auto | Environment (set by platform) | `production` |

---

## Troubleshooting

### Webhook not working

1. **Check webhook URL**:
   ```bash
   curl "https://api.telegram.org/bot<BOT_TOKEN>/getWebhookInfo"
   ```

2. **Reset webhook**:
   ```bash
   # Delete webhook
   curl "https://api.telegram.org/bot<BOT_TOKEN>/deleteWebhook"
   
   # Set new webhook
   curl -X POST "https://api.telegram.org/bot<BOT_TOKEN>/setWebhook" \
     -d "url=https://your-app-url.com/api/webhook"
   ```

3. **Check logs**: Look for errors in your platform's logs

### Environment variables not working

1. Make sure variables are set in your platform's dashboard
2. Restart/redeploy the app after changing variables
3. Check for typos in variable names
4. Verify values don't have extra spaces

### Build failures

1. **Check Node.js version**: Ensure platform uses Node 18+
2. **Check dependencies**: Run `npm install` locally first
3. **Review build logs**: Look for specific error messages
4. **Clear cache**: Some platforms have a cache clear option

### Bot not responding

1. **Verify webhook**: Check webhook status
2. **Check environment variables**: Ensure all are set correctly
3. **Review logs**: Look for error messages
4. **Test endpoint**: Visit `/api/webhook` directly
5. **Bot admin rights**: Ensure bot is admin in channel

---

## Custom Domain (Optional)

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `WEBHOOK_URL` environment variable
5. Re-run webhook setup

### Other Platforms

Each platform has similar domain configuration in their dashboard settings.

---

## Scaling & Performance

### Vercel
- Automatic scaling
- 100GB bandwidth on free tier
- Upgrade to Pro for more

### Railway
- 500 hours/month on free tier
- Pay-as-you-go scaling

### Render
- Free tier has limitations
- Upgrade for better performance

### DigitalOcean
- Fixed pricing tiers
- Predictable costs

---

## Security Best Practices

1. **Never commit** `.env.local` to Git
2. **Rotate tokens** regularly
3. **Use environment variables** for all secrets
4. **Enable 2FA** on all accounts
5. **Monitor logs** for suspicious activity

---

## Updating Your Bot

### Vercel (Auto-deploy enabled)
```bash
git add .
git commit -m "Update bot features"
git push origin main
```
Vercel will auto-deploy!

### Manual Deploy
1. Push changes to GitHub
2. Trigger manual deploy in platform dashboard
3. Wait for build to complete
4. Test the changes

---

## Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Vercel** | 100GB bandwidth | From $20/mo | Next.js apps, hobby projects |
| **Railway** | 500hrs/mo | Pay-as-you-go | Small to medium bots |
| **Render** | Limited | From $7/mo | Simple deployments |
| **DigitalOcean** | $200 credit | From $5/mo | Full control, scalability |

---

## Support

If you encounter issues:

1. Check the [main README](./README.md)
2. Review [Setup Guide](./SETUP_GUIDE.md)
3. Check platform documentation
4. Review Telegram Bot API docs
5. Check TMDB API status

---

**Happy Deploying! 🚀**
