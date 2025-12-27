/**
 * Environment variable validation and configuration
 */

// Validate required environment variables
const requiredEnvVars = ['BOT_TOKEN', 'TMDB_API_KEY'] as const;

const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.warn(
        `⚠️  Missing environment variables: ${missingEnvVars.join(', ')}\n` +
        `Please set them in your .env.local file.\n` +
        `The bot will not work correctly without these variables.`
    );
}

// Optional environment variables
if (!process.env.CHANNEL_USERNAME) {
    console.warn(
        `⚠️  CHANNEL_USERNAME not set. You won't be able to share movies to a channel.\n` +
        `Set this in your .env.local file (e.g., CHANNEL_USERNAME=@yourchannel)`
    );
}

export const config = {
    botToken: process.env.BOT_TOKEN || '',
    tmdbApiKey: process.env.TMDB_API_KEY || '',
    channelUsername: process.env.CHANNEL_USERNAME || '',
    webhookUrl: process.env.WEBHOOK_URL || '',
    nodeEnv: process.env.NODE_ENV || 'development',
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
} as const;

// Export validation function
export function validateConfig(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!config.botToken) {
        errors.push('BOT_TOKEN is required');
    }

    if (!config.tmdbApiKey) {
        errors.push('TMDB_API_KEY is required');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}
