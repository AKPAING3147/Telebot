# 🎬 Telegram Movie Bot - Quick Reference

## 🚀 Quick Start

### 1. Fill in `.env.local`:
```env
BOT_TOKEN=your_bot_token_from_botfather
TMDB_API_KEY=your_tmdb_api_key
CHANNEL_USERNAME=@yourchannel
```

### 2. Get Bot Token from @BotFather:
1. Search @BotFather on Telegram
2. Send `/newbot`
3. Follow instructions
4. Copy your token

### 3. Get TMDB API Key:
1. Visit https://www.themoviedb.org/
2. Create account → Settings → API
3. Request API key (Developer)
4. Copy your key

### 4. Setup Channel:
1. Create Telegram channel
2. Add bot as admin
3. Grant "Post Messages" permission
4. Copy channel username (with @)

### 5. Deploy to Vercel:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```
Then:
- Go to vercel.com
- Import repository
- Add environment variables
- Deploy
- Visit `/api/setup-webhook`

## 📁 Important Files

| File | Purpose |
|------|---------|
| `app/api/webhook/route.ts` | Main bot logic |
| `lib/telegram.ts` | Telegram API functions |
| `lib/tmdb.ts` | Movie search & formatting |
| `.env.local` | Your secret credentials |
| `README.md` | Full documentation |

## 🔧 Useful Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check webhook status
curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo

# Set webhook manually
curl -X POST https://api.telegram.org/bot<TOKEN>/setWebhook \
  -d url=https://yourapp.vercel.app/api/webhook
```

## 🧪 Test Locally with ngrok

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Start ngrok
ngrok http 3001

# Set webhook to ngrok URL
# Visit: https://yoururl.ngrok.io/api/setup-webhook
```

## 📱 Bot Commands

- `/start` - Welcome message
- `/help` - Usage instructions
- `Inception` - Search for movie "Inception"
- Click "📢 Share to Channel" - Post to channel

## 🌐 API Endpoints

- `http://localhost:3001` - Homepage
- `http://localhost:3001/api/webhook` - Webhook endpoint
- `http://localhost:3001/api/setup-webhook` - Setup page

## ❗ Troubleshooting

**Bot not responding?**
→ Check webhook status: Visit `/api/setup-webhook`

**Can't share to channel?**
→ Make bot admin in channel with "Post Messages" permission

**Movies not found?**
→ Verify TMDB API key is correct

**Build errors?**
→ Run `npm install` and check environment variables

## 📚 Documentation Files

1. **PROJECT_SUMMARY.md** - This overview (you are here)
2. **README.md** - Complete documentation
3. **SETUP_GUIDE.md** - Step-by-step setup
4. **DEPLOYMENT.md** - Deployment guides
5. **.env.example** - Environment variable template

## ✅ Deployment Checklist

- [ ] Bot token from @BotFather
- [ ] TMDB API key
- [ ] Telegram channel created
- [ ] Bot added as admin to channel
- [ ] `.env.local` configured
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel/Railway/Render
- [ ] Webhook configured
- [ ] Tested on Telegram
- [ ] Channel post successful

## 🎯 Deployment Platforms

| Platform | Free Tier | Time to Deploy |
|----------|-----------|----------------|
| **Vercel** | ✅ 100GB | ~5 minutes |
| **Railway** | ✅ 500hrs/mo | ~5 minutes |
| **Render** | ✅ Limited | ~10 minutes |
| **DigitalOcean** | $200 credit | ~15 minutes |

## 💡 Pro Tips

1. **Use Vercel** for easiest deployment
2. **Set environment variables** in platform dashboard
3. **Test locally** with ngrok before deploying
4. **Check logs** if something doesn't work
5. **Make bot admin** in channel before testing

## 📞 Getting Help

- Read `README.md` for detailed docs
- Check `SETUP_GUIDE.md` for step-by-step
- Review `DEPLOYMENT.md` for deployment help
- Check Telegram Bot API docs
- Review TMDB API documentation

---

**You're all set! Deploy and enjoy your movie bot! 🎬🤖**
