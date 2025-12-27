# 🪟 Windows PowerShell Commands for Telegram Bot

## ⚠️ Important Note for Windows Users

PowerShell uses `Invoke-RestMethod` or `Invoke-WebRequest` instead of `curl`. The Unix-style `curl` commands won't work!

---

## 🚀 Quick Setup with PowerShell

### Step 1: Get Your ngrok URL

Run ngrok in a separate terminal:
```powershell
ngrok http 3001
```

You'll see output like:
```
Forwarding   https://abc-123-def.ngrok-free.app -> http://localhost:3001
```

**Copy that HTTPS URL!** (e.g., `https://abc-123-def.ngrok-free.app`)

---

### Step 2: Set Webhook (PowerShell Method)

Replace `YOUR_BOT_TOKEN` and `YOUR_NGROK_URL` with your actual values:

```powershell
$botToken = "YOUR_BOT_TOKEN"
$webhookUrl = "YOUR_NGROK_URL/api/webhook"
$uri = "https://api.telegram.org/bot$botToken/setWebhook"
$body = @{ url = $webhookUrl } | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body
```

**Example with actual values:**
```powershell
$botToken = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
$webhookUrl = "https://abc-123-def.ngrok-free.app/api/webhook"
$uri = "https://api.telegram.org/bot$botToken/setWebhook"
$body = @{ url = $webhookUrl } | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body
```

---

### Step 3: Verify Webhook

```powershell
$botToken = "YOUR_BOT_TOKEN"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getWebhookInfo" -Method Get
```

You should see:
```json
{
  "ok": true,
  "result": {
    "url": "https://your-ngrok-url/api/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

---

## 🎯 Easiest Method: Use the Setup Script

1. Open `set-webhook.ps1` in a text editor
2. Update these two lines:
   ```powershell
   $BOT_TOKEN = "your_actual_bot_token_here"
   $APP_URL = "https://your-ngrok-url-here"
   ```
3. Save the file
4. Run in PowerShell:
   ```powershell
   .\set-webhook.ps1
   ```

---

## 📋 Complete Setup Example

### Terminal 1: Run Dev Server
```powershell
npm run dev
```

### Terminal 2: Run ngrok
```powershell
ngrok http 3001
```

### Terminal 3: Set Webhook
```powershell
# Copy your values here
$botToken = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
$webhookUrl = "https://abc-123-def.ngrok-free.app/api/webhook"

# Run these commands
$uri = "https://api.telegram.org/bot$botToken/setWebhook"
$body = @{ url = $webhookUrl } | ConvertTo-Json
Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body
```

---

## 🧪 Test Your Bot

1. Open Telegram
2. Search for your bot
3. Send: `/start`
4. Send: `Inception`
5. Click "📢 Share to Channel"

---

## 🔧 Useful PowerShell Commands

### Delete Webhook
```powershell
$botToken = "YOUR_BOT_TOKEN"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/deleteWebhook" -Method Get
```

### Get Bot Info
```powershell
$botToken = "YOUR_BOT_TOKEN"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getMe" -Method Get
```

### Get Updates (for debugging)
```powershell
$botToken = "YOUR_BOT_TOKEN"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getUpdates" -Method Get
```

### Send Test Message
```powershell
$botToken = "YOUR_BOT_TOKEN"
$chatId = "YOUR_CHAT_ID"  # Your Telegram user ID
$text = "Hello from PowerShell!"
$uri = "https://api.telegram.org/bot$botToken/sendMessage"
$body = @{ chat_id = $chatId; text = $text } | ConvertTo-Json

Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body
```

---

## 🐛 Troubleshooting

### "pending_update_count" is high
Your bot received messages while webhook was not set. Clear them:
```powershell
$botToken = "YOUR_BOT_TOKEN"
Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getUpdates?offset=-1" -Method Get
```

### ngrok URL changed
ngrok free tier gives you a new URL each time. You need to:
1. Get new ngrok URL
2. Set webhook again with new URL

### Want a permanent URL?
- Use ngrok paid (permanent domains)
- OR deploy to Vercel/Railway for free permanent URL

---

## 🌐 Alternative: Use the Web Interface

Instead of PowerShell commands, you can also:

1. Make sure your dev server is running
2. Make sure ngrok is running  
3. Open in browser: `http://localhost:3001/api/setup-webhook`
4. Update `.env.local`:
   ```env
   WEBHOOK_URL=https://your-ngrok-url-here
   ```
5. Restart your dev server
6. Visit: `http://localhost:3001/api/setup-webhook` again

---

## 💡 Pro Tip: Create a Profile Script

To avoid typing these commands every time, create a PowerShell profile:

```powershell
# Create profile if it doesn't exist
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}

# Open profile in notepad
notepad $PROFILE
```

Add your bot token as a function:
```powershell
function Set-TelegramWebhook {
    param(
        [string]$WebhookUrl
    )
    $botToken = "YOUR_BOT_TOKEN_HERE"
    $uri = "https://api.telegram.org/bot$botToken/setWebhook"
    $body = @{ url = $WebhookUrl } | ConvertTo-Json
    Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body
}

function Get-TelegramWebhookInfo {
    $botToken = "YOUR_BOT_TOKEN_HERE"
    Invoke-RestMethod -Uri "https://api.telegram.org/bot$botToken/getWebhookInfo" -Method Get
}
```

Save and reload:
```powershell
. $PROFILE
```

Now you can just run:
```powershell
Set-TelegramWebhook -WebhookUrl "https://your-ngrok-url/api/webhook"
Get-TelegramWebhookInfo
```

---

**That's it! Your bot should now work on Windows with PowerShell! 🎉**
