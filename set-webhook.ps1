# ========================================
# PowerShell Script to Set Telegram Webhook
# ========================================
# 
# How to use this script:
# 1. Update the variables below with your actual values
# 2. Run: .\set-webhook.ps1
# ========================================

# ----------------------------------------
# Configuration
# ----------------------------------------

# Your Telegram Bot Token (from @BotFather)
$BOT_TOKEN = "7242949114:AAE4m9dAUNoPX5gL_wq-eJZFUz5qKf1Ggqc"

# Your ngrok or deployed URL (without /api/webhook at the end)
# 
# TO GET YOUR NGROK URL:
# 1. Look at your ngrok terminal window
# 2. Find the line that says "Forwarding"
# 3. Copy the HTTPS URL (looks like: https://xxxx-xx-xx-xxx-xxx.ngrok-free.app)
# 4. Paste it below (replace the text between quotes)
#
# Examples:
#   ngrok: "https://1234-56-78-901-234.ngrok-free.app"
#   Vercel: "https://mybot.vercel.app"
$APP_URL = "PASTE_YOUR_NGROK_HTTPS_URL_HERE"

# ----------------------------------------
# Don't modify below this line
# ----------------------------------------

$WEBHOOK_URL = "$APP_URL/api/webhook"
$TELEGRAM_API = "https://api.telegram.org/bot$BOT_TOKEN"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Telegram Webhook Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set webhook
Write-Host "Setting webhook to: $WEBHOOK_URL" -ForegroundColor Yellow
Write-Host ""

$body = @{
    url = $WEBHOOK_URL
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$TELEGRAM_API/setWebhook" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body
    
    if ($response.ok) {
        Write-Host "✓ Webhook set successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Webhook URL: $WEBHOOK_URL" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to set webhook" -ForegroundColor Red
        Write-Host "Error: $($response.description)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Error occurred:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "Checking webhook info..." -ForegroundColor Yellow
Write-Host ""

# Get webhook info
try {
    $webhookInfo = Invoke-RestMethod -Uri "$TELEGRAM_API/getWebhookInfo" -Method Get
    
    Write-Host "Current webhook configuration:" -ForegroundColor Cyan
    Write-Host "  URL: $($webhookInfo.result.url)" -ForegroundColor White
    Write-Host "  Pending updates: $($webhookInfo.result.pending_update_count)" -ForegroundColor White
    Write-Host "  Last error: $($webhookInfo.result.last_error_message)" -ForegroundColor White
    Write-Host "  Last error date: $($webhookInfo.result.last_error_date)" -ForegroundColor White
} catch {
    Write-Host "✗ Could not fetch webhook info" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Done! Test your bot on Telegram now." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
