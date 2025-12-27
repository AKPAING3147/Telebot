import { NextRequest, NextResponse } from 'next/server';
import {
    sendMessage,
    sendPhoto,
    answerCallbackQuery,
    createInlineKeyboard,
    TelegramMessage,
    TelegramCallbackQuery,
} from '@/lib/telegram';
import {
    searchMovies,
    getMovieDetails,
    getPosterUrl,
    formatMovieMessage,
    formatChannelCaption,
} from '@/lib/tmdb';

/**
 * Telegram Webhook Handler
 * 
 * This endpoint receives updates from Telegram, including:
 * - User messages (for movie search)
 * - Callback queries (when user clicks "Share to Channel" button)
 */

const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Received update:', JSON.stringify(body, null, 2));

        // Handle regular messages
        if (body.message) {
            await handleMessage(body.message);
        }

        // Handle callback queries (button presses)
        if (body.callback_query) {
            await handleCallbackQuery(body.callback_query);
        }

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { ok: false, error: error.message },
            { status: 500 }
        );
    }
}

/**
 * Handle incoming text messages
 * Search for movies and send results to user
 */
async function handleMessage(message: TelegramMessage) {
    const chatId = message.chat.id;
    const text = message.text?.trim();

    if (!text) return;

    // Handle /start command
    if (text === '/start') {
        await sendMessage(
            chatId,
            '🎬 Welcome to the Movie Bot!\n\n' +
            'Send me a movie name and I\'ll search for it.\n' +
            'You can then share it to your channel with a single tap!\n\n' +
            'Example: Try searching for "Inception" or "The Matrix"'
        );
        return;
    }

    // Handle /help command
    if (text === '/help') {
        await sendMessage(
            chatId,
            '📖 <b>How to use this bot:</b>\n\n' +
            '1️⃣ Send me a movie name\n' +
            '2️⃣ I\'ll search and show you the details\n' +
            '3️⃣ Click "📢 Share to Channel" to post it\n' +
            '4️⃣ The movie will be shared to your channel!\n\n' +
            '<i>Make sure the bot is an admin in your channel.</i>',
            { parse_mode: 'HTML' }
        );
        return;
    }

    // Search for movies
    try {
        // Send searching message
        await sendMessage(chatId, `🔍 Searching for "${text}"...`);

        const searchResults = await searchMovies(text);

        if (searchResults.results.length === 0) {
            await sendMessage(
                chatId,
                '❌ No movies found. Please try a different search term.'
            );
            return;
        }

        // Get the first (most relevant) result
        const movie = searchResults.results[0];
        const posterUrl = getPosterUrl(movie.poster_path);

        // Create inline keyboard with "Share to Channel" button
        const keyboard = createInlineKeyboard([
            [
                {
                    text: '📢 Share to Channel',
                    callback_data: `share_${movie.id}`,
                },
            ],
        ]);

        // Send movie details with poster
        if (posterUrl) {
            await sendPhoto(chatId, posterUrl, {
                caption: formatMovieMessage(movie),
                parse_mode: 'HTML',
                reply_markup: keyboard,
            });
        } else {
            // If no poster, send text message with keyboard
            await sendMessage(chatId, formatMovieMessage(movie), {
                parse_mode: 'HTML',
                reply_markup: keyboard,
            });
        }
    } catch (error: any) {
        console.error('Error handling message:', error);
        await sendMessage(
            chatId,
            '❌ Sorry, something went wrong while searching. Please try again later.'
        );
    }
}

/**
 * Handle callback queries (button clicks)
 * Share movie to channel when user clicks the button
 */
async function handleCallbackQuery(callbackQuery: TelegramCallbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const callbackData = callbackQuery.data;

    // Answer the callback query immediately
    await answerCallbackQuery(callbackQuery.id, {
        text: 'Processing...',
    });

    try {
        // Parse callback data to get movie ID
        if (callbackData.startsWith('share_')) {
            const movieId = parseInt(callbackData.replace('share_', ''));

            if (!CHANNEL_USERNAME) {
                await sendMessage(
                    chatId,
                    '❌ Channel username not configured. Please set CHANNEL_USERNAME in environment variables.'
                );
                return;
            }

            // Fetch full movie details
            const movieDetails = await getMovieDetails(movieId);
            const posterUrl = getPosterUrl(movieDetails.poster_path);

            // Post to channel
            if (posterUrl) {
                await sendPhoto(CHANNEL_USERNAME, posterUrl, {
                    caption: formatChannelCaption(movieDetails),
                    parse_mode: 'HTML',
                });
            } else {
                await sendMessage(CHANNEL_USERNAME, formatChannelCaption(movieDetails), {
                    parse_mode: 'HTML',
                });
            }

            // Send confirmation to user
            await sendMessage(
                chatId,
                `✅ Successfully shared "${movieDetails.title}" to the channel!\n\n` +
                `Check it out: ${CHANNEL_USERNAME}`,
                { parse_mode: 'HTML' }
            );
        }
    } catch (error: any) {
        console.error('Error handling callback query:', error);

        // Send error message to user
        let errorMessage = '❌ Failed to share movie to channel.\n\n';

        if (error.response?.data?.description) {
            const description = error.response.data.description;

            if (description.includes('bot is not a member')) {
                errorMessage += '⚠️ Bot is not a member of the channel. Please add the bot to your channel and make it an admin.';
            } else if (description.includes('not enough rights')) {
                errorMessage += '⚠️ Bot doesn\'t have enough permissions. Please make the bot an admin in your channel.';
            } else {
                errorMessage += `Error: ${description}`;
            }
        } else {
            errorMessage += 'Please try again later.';
        }

        await sendMessage(chatId, errorMessage);
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Webhook endpoint is running',
    });
}
