# Quick script to get your ngrok URL

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Getting ngrok URL..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Wait a moment for ngrok to start
    Start-Sleep -Seconds 2
    
    # Try to get ngrok URL from API
    $tunnels = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -ErrorAction Stop
    $httpsUrl = $tunnels.tunnels | Where-Object { $_.proto -eq "https" } | Select-Object -ExpandProperty public_url
    
    if ($httpsUrl) {
        Write-Host "✓ Found your ngrok URL!" -ForegroundColor Green
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
        Write-Host "  $httpsUrl" -ForegroundColor Yellow
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Copy the URL above and paste it into set-webhook.ps1" -ForegroundColor White
        Write-Host "Replace: " -NoNewline -ForegroundColor White
        Write-Host "PASTE_YOUR_NGROK_HTTPS_URL_HERE" -ForegroundColor Red
        Write-Host ""
        
        # Copy to clipboard
        $httpsUrl | Set-Clipboard
        Write-Host "✓ URL copied to clipboard!" -ForegroundColor Green
    } else {
        Write-Host "✗ Could not find HTTPS tunnel" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Could not connect to ngrok" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please make sure:" -ForegroundColor Yellow
    Write-Host "  1. ngrok is running" -ForegroundColor White
    Write-Host "  2. You ran: ngrok http 3001" -ForegroundColor White
    Write-Host ""
    Write-Host "If ngrok IS running, check the ngrok window:" -ForegroundColor Yellow
    Write-Host "  Look for a line like:" -ForegroundColor White
    Write-Host "  Forwarding   https://xxxx-xx-xx.ngrok-free.app -> http://localhost:3001" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Copy the HTTPS URL (before the ->)" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
