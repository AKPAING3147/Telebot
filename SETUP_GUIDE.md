# 🚀 Quick Setup Guide

This guide will help you get your Telegram Movie Bot up and running in under 10 minutes!

## Step 1: Get Your Telegram Bot Token

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the instructions:
   - Choose a name for your bot (e.g., "My Movie Bot")
   - Choose a username (must end with 'bot', e.g., "mymoviebot" or "MyAwesomeMovieBot")
4. Copy the bot token (looks like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)
5. **Keep this token secret!**

## Step 2: Get Your TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Fill in the required information (can use placeholder data for personal use)
6. Copy your API key

## Step 3: Create Your Telegram Channel

1. Open Telegram
2. Create a new channel (tap the pencil icon → New Channel)
3. Name your channel
4. Make it **Public** and set a username (e.g., `@mymoviechannel`)
5. Add your bot to the channel:
   - Go to channel settings → Administrators → Add Administrator
   - Search for your bot username
   - Add it and grant "Post Messages" permission
6. Copy your channel username (with the @)

## Step 4: Configure Environment Variables

1. Open `.env.local` file in the project
2. Replace the placeholder values:

```env
# Telegram Bot Configuration
BOT_TOKEN=YOUR_BOT_TOKEN_HERE
CHANNEL_USERNAME=@your_channel_username

# TMDB API Configuration
TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE

# Webhook Configuration (leave this for now, will set after deployment)
WEBHOOK_URL=
```

## Step 5: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install all required packages.

## Step 6: Test Locally (Optional)

To test locally before deploying:

1. **Install ngrok** (for exposing local server):
   - Download from [ngrok.com](https://ngrok.com/)
   - Or use: `npm install -g ngrok`

2. **Start your dev server**:
   ```bash
   npm run dev
   ```

3. **In another terminal, start ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL from ngrok** (e.g., `https://abc123.ngrok.io`)

5. **Set the webhook**:
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://abc123.ngrok.io/api/webhook"}'
   ```

6. **Test your bot on Telegram!**
   - Search for your bot
   - Send `/start`
   - Try searching for a movie

## Step 7: Deploy to Vercel

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `BOT_TOKEN`: Your bot token
     - `TMDB_API_KEY`: Your TMDB API key
     - `CHANNEL_USERNAME`: Your channel username (with @)
     - `WEBHOOK_URL`: Will be your Vercel URL (e.g., `https://your-bot.vercel.app`)
   - Click "Deploy"

3. **Wait for deployment to complete**

4. **Copy your deployment URL** (e.g., `https://your-bot.vercel.app`)

## Step 8: Set Up Webhook

After deployment, you need to tell Telegram where to send updates.

**Option 1: Automatic (Easiest)**

Just visit this URL in your browser:
```
https://your-bot.vercel.app/api/setup-webhook
```

The bot will automatically configure itself using the `WEBHOOK_URL` environment variable.

**Option 2: Manual**

Run this command:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-bot.vercel.app/api/webhook"}'
```

## Step 9: Verify Everything Works

1. **Check webhook status**:
   Visit: `https://your-bot.vercel.app/api/setup-webhook`
   
   You should see webhook information showing it's active.

2. **Test the bot**:
   - Open Telegram
   - Search for your bot
   - Send `/start`
   - Search for a movie (e.g., "Inception")
   - Click "📢 Share to Channel"
   - Check your channel!

## 🎉 You're Done!

Your bot is now live and ready to use!

## Common Issues & Solutions

### Issue: Bot not responding

**Solution**:
- Check Vercel logs for errors
- Verify webhook is set: `https://your-bot.vercel.app/api/setup-webhook`
- Make sure environment variables are set in Vercel

### Issue: "Bot is not a member of the channel"

**Solution**:
- Add bot to your channel
- Make sure channel username is correct (starts with @)
- Bot needs to be added as admin

### Issue: "Not enough rights to send messages"

**Solution**:
- Go to channel settings → Administrators
- Find your bot
- Enable "Post Messages" permission

### Issue: TMDB API not working

**Solution**:
- Verify API key is correct
- Make sure you've accepted TMDB API terms
- Check if API key is active in your TMDB account

## Next Steps

Now that your bot is working:

1. **Customize the bot**:
   - Edit messages in `app/api/webhook/route.ts`
   - Change formatting in `lib/tmdb.ts`
   - Add more features!

2. **Monitor usage**:
   - Check Vercel logs
   - Monitor channel posts
   - Track user interactions

3. **Promote your bot**:
   - Share it with friends
   - Add it to bot directories
   - Promote your channel!

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review [Telegram Bot API docs](https://core.telegram.org/bots/api)
- Check [TMDB API docs](https://developers.themoviedb.org/3)

---

**Enjoy your new Telegram Movie Bot! 🎬🤖**
