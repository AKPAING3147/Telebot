import axios from 'axios';

// Telegram Bot API base URL
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

/**
 * Telegram API interface for sending messages and handling bot interactions
 */

// Type definitions for Telegram API
export interface TelegramMessage {
    message_id: number;
    from: {
        id: number;
        first_name: string;
        username?: string;
    };
    chat: {
        id: number;
        type: string;
    };
    text?: string;
}

export interface TelegramCallbackQuery {
    id: string;
    from: {
        id: number;
        first_name: string;
    };
    message: TelegramMessage;
    data: string;
}

export interface InlineKeyboardButton {
    text: string;
    callback_data?: string;
    url?: string;
}

/**
 * Send a text message to a chat
 */
export async function sendMessage(
    chatId: number | string,
    text: string,
    options?: {
        reply_markup?: any;
        parse_mode?: 'HTML' | 'Markdown';
    }
) {
    try {
        const response = await axios.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text,
            ...options,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Send a photo to a chat
 */
export async function sendPhoto(
    chatId: number | string,
    photo: string,
    options?: {
        caption?: string;
        reply_markup?: any;
        parse_mode?: 'HTML' | 'Markdown';
    }
) {
    try {
        const response = await axios.post(`${TELEGRAM_API}/sendPhoto`, {
            chat_id: chatId,
            photo,
            ...options,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error sending photo:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Answer a callback query (from inline keyboard button press)
 */
export async function answerCallbackQuery(
    callbackQueryId: string,
    options?: {
        text?: string;
        show_alert?: boolean;
    }
) {
    try {
        const response = await axios.post(`${TELEGRAM_API}/answerCallbackQuery`, {
            callback_query_id: callbackQueryId,
            ...options,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error answering callback:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Set webhook URL for receiving updates
 */
export async function setWebhook(url: string) {
    try {
        const response = await axios.post(`${TELEGRAM_API}/setWebhook`, {
            url,
        });
        return response.data;
    } catch (error: any) {
        console.error('Error setting webhook:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Get current webhook info
 */
export async function getWebhookInfo() {
    try {
        const response = await axios.get(`${TELEGRAM_API}/getWebhookInfo`);
        return response.data;
    } catch (error: any) {
        console.error('Error getting webhook info:', error.response?.data || error.message);
        throw error;
    }
}

/**
 * Create an inline keyboard markup
 */
export function createInlineKeyboard(buttons: InlineKeyboardButton[][]) {
    return {
        inline_keyboard: buttons,
    };
}
