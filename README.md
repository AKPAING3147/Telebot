# 🎬 Telegram Movie Bot

A powerful Telegram bot built with Next.js (App Router) that allows users to search for movies using the TMDB API and share them directly to a Telegram channel.

## ✨ Features

- 🔍 **Movie Search**: Search for any movie using natural language
- 📊 **Detailed Information**: Get movie title, rating, overview, release year, and poster
- 📢 **Share to Channel**: One-click sharing to your Telegram channel
- 🤖 **Webhook-based**: Fast and efficient webhook-based bot (no polling)
- 🎨 **Rich Formatting**: Beautiful HTML-formatted messages with emojis
- ⚡ **Built with Next.js 14**: Modern, fast, and scalable

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:

1. **Node.js** (v18 or higher)
2. **Telegram Bot Token** - Get it from [@BotFather](https://t.me/BotFather)
3. **TMDB API Key** - Get it from [TMDB](https://www.themoviedb.org/settings/api)
4. **Telegram Channel** - Create a channel and add your bot as an admin

### Installation

1. **Clone or download this project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   
   Edit the `.env.local` file and add your credentials:
   ```env
   # Telegram Bot Configuration
   BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   CHANNEL_USERNAME=@yourchannel
   
   # TMDB API Configuration
   TMDB_API_KEY=your_tmdb_api_key_here
   
   # Webhook Configuration (set after deployment)
   WEBHOOK_URL=https://yourdomain.com/api/webhook
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

   The app will start at `http://localhost:3000`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (BOT_TOKEN, TMDB_API_KEY, CHANNEL_USERNAME)
   - Deploy!

3. **Set up the webhook**:
   
   After deployment, you need to tell Telegram where to send updates.
   
   **Option 1: Use the setup endpoint**
   
   Visit: `https://yourdomain.com/api/setup-webhook`
   
   This will automatically configure the webhook using your WEBHOOK_URL environment variable.
   
   **Option 2: Manual setup**
   
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://yourdomain.com/api/webhook"}'
   ```

4. **Verify webhook status**:
   
   Visit: `https://yourdomain.com/api/setup-webhook` (GET request)
   
   Or check manually:
   ```bash
   curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
   ```

### Deploy to Other Platforms

You can deploy to any platform that supports Next.js:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Netlify (with Next.js plugin)

Just make sure to:
1. Set all environment variables
2. Set the webhook URL after deployment

## 📖 How to Use

### For Users

1. **Start the bot**: Send `/start` to your bot on Telegram
2. **Search for a movie**: Just send a movie name (e.g., "Inception")
3. **View details**: The bot will show you the movie poster and details
4. **Share to channel**: Click the "📢 Share to Channel" button
5. **Done!**: The movie is now posted to your channel

### Bot Commands

- `/start` - Welcome message and introduction
- `/help` - Instructions on how to use the bot
- `<movie name>` - Search for any movie

### Setting Up Your Channel

1. Create a Telegram channel
2. Add your bot to the channel
3. Make the bot an **admin** with permission to post messages
4. Set the `CHANNEL_USERNAME` in `.env.local` (e.g., `@mychannel`)

## 🏗️ Project Structure

```
telegram-movie-bot/
├── app/
│   ├── api/
│   │   ├── webhook/
│   │   │   └── route.ts          # Main webhook handler
│   │   └── setup-webhook/
│   │       └── route.ts          # Webhook setup endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── lib/
│   ├── telegram.ts               # Telegram API utilities
│   └── tmdb.ts                   # TMDB API utilities
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔧 API Endpoints

### `POST /api/webhook`
Main webhook endpoint that receives updates from Telegram.

**Handles**:
- User messages (movie search)
- Callback queries (share button clicks)

### `GET /api/webhook`
Health check endpoint - returns webhook status.

### `GET /api/setup-webhook`
Check current webhook configuration.

### `POST /api/setup-webhook`
Set or update webhook URL.

**Request body** (optional):
```json
{
  "webhook_url": "https://yourdomain.com"
}
```

## 🎯 Key Features Explained

### Movie Search Flow

1. User sends a movie name
2. Bot searches TMDB API
3. Bot returns the most relevant result with:
   - Movie poster (if available)
   - Title and release year
   - Rating and vote count
   - Overview/description
   - "Share to Channel" button

### Share to Channel Flow

1. User clicks "📢 Share to Channel" button
2. Bot receives callback query with movie ID
3. Bot fetches full movie details from TMDB
4. Bot posts to the channel with formatted caption
5. Bot confirms to the user that sharing was successful

## 🛠️ Development

### Running Locally

For local development, you can use tools like [ngrok](https://ngrok.com/) to expose your local server:

```bash
# Start your Next.js dev server
npm run dev

# In another terminal, start ngrok
ngrok http 3000

# Use the ngrok URL to set your webhook
# Example: https://abc123.ngrok.io/api/webhook
```

### Testing

1. **Test movie search**: Send a movie name to your bot
2. **Test sharing**: Click the share button and check your channel
3. **Test error handling**: Try with bot not added to channel, or without admin rights

## 🐛 Troubleshooting

### Bot not responding

- Check if webhook is set correctly: `GET /api/setup-webhook`
- Verify environment variables are set
- Check server logs for errors

### "Bot is not a member of the channel"

- Add your bot to the channel
- Make sure the channel username is correct (starts with @)

### "Not enough rights to send messages"

- Make the bot an admin in your channel
- Grant "Post Messages" permission

### Movies not found

- Verify your TMDB API key is valid
- Check if the movie name is spelled correctly
- Try different search terms

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `BOT_TOKEN` | Your Telegram bot token from @BotFather | `1234567890:ABC...` |
| `CHANNEL_USERNAME` | Your channel username (with @) | `@mychannel` |
| `TMDB_API_KEY` | Your TMDB API key | `abc123...` |
| `WEBHOOK_URL` | Your deployed app URL (optional) | `https://mybot.vercel.app` |

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Keep your bot token and API keys secret
- Use environment variables for all sensitive data
- Validate all incoming webhook requests in production

## 📚 Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

## 🎉 Credits

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Axios](https://axios-http.com/) - HTTP client
- [Telegram Bot API](https://core.telegram.org/bots/api) - Bot interface
- [TMDB API](https://www.themoviedb.org/) - Movie database

## 📄 License

This project is open source and available for educational purposes.

---

**Made with ❤️ using Next.js and Telegram Bot API**

---

## 🚀 Quick Start Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Create a bot with @BotFather
- [ ] Get TMDB API key
- [ ] Create a Telegram channel
- [ ] Add bot to channel as admin
- [ ] Configure `.env.local`
- [ ] Deploy to Vercel
- [ ] Set webhook URL
- [ ] Test the bot
- [ ] Enjoy! 🎉
