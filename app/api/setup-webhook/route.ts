import { NextRequest, NextResponse } from 'next/server';
import { setWebhook, getWebhookInfo } from '@/lib/telegram';

/**
 * Webhook Setup Endpoint
 * 
 * This endpoint helps you configure the webhook URL for your Telegram bot.
 * 
 * Usage:
 * - GET /api/setup-webhook - Check current webhook status
 * - POST /api/setup-webhook - Set the webhook URL
 */

export async function GET() {
    try {
        const webhookInfo = await getWebhookInfo();

        return NextResponse.json({
            success: true,
            webhook_info: webhookInfo.result,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get webhook URL from environment or request body
        const body = await request.json().catch(() => ({}));
        const webhookUrl = body.webhook_url || process.env.WEBHOOK_URL;

        if (!webhookUrl) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Webhook URL not provided. Set WEBHOOK_URL in environment or pass webhook_url in request body.',
                },
                { status: 400 }
            );
        }

        // Ensure webhook URL ends with /api/webhook
        const fullWebhookUrl = webhookUrl.endsWith('/api/webhook')
            ? webhookUrl
            : `${webhookUrl}/api/webhook`;

        // Set the webhook
        const result = await setWebhook(fullWebhookUrl);

        return NextResponse.json({
            success: true,
            message: 'Webhook set successfully',
            webhook_url: fullWebhookUrl,
            result,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
