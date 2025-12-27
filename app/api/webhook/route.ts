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
import {
    getTranslation,
    getUserLanguage,
    setUserLanguage,
    Language,
} from '@/lib/languages';

/**
 * Telegram Webhook Handler
 * 
 * This endpoint receives updates from Telegram, including:
 * - User messages (for movie search)
 * - Callback queries (when user clicks "Share to Channel" button)
 */

const CHANNEL_USERNAME = process.env.CHANNEL_USERNAME; // Announcement channel
const MOVIE_CHANNEL = process.env.MOVIE_CHANNEL; // Movie content channel

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
    const userId = message.from.id;
    const text = message.text?.trim();

    if (!text) return;

    // Get user's translations
    const t = getTranslation(userId);

    // Handle /start command
    if (text === '/start') {
        await sendMessage(chatId, t.welcome);
        return;
    }

    // Handle /help command
    if (text === '/help') {
        await sendMessage(chatId, t.help, { parse_mode: 'HTML' });
        return;
    }

    // Handle /language command
    if (text === '/language') {
        const languageKeyboard = createInlineKeyboard([
            [
                {
                    text: '🇬🇧 English',
                    callback_data: 'lang_en',
                },
                {
                    text: '🇲🇲 မြန်မာ',
                    callback_data: 'lang_my',
                },
            ],
        ]);

        await sendMessage(chatId, t.languagePrompt, {
            parse_mode: 'HTML',
            reply_markup: languageKeyboard,
        });
        return;
    }

    // Search for movies
    try {
        // Send searching message
        await sendMessage(chatId, t.searching.replace('{query}', text));

        const searchResults = await searchMovies(text);

        if (searchResults.results.length === 0) {
            await sendMessage(chatId, t.noResults);
            return;
        }

        // Get the first (most relevant) result
        const movie = searchResults.results[0];
        const posterUrl = getPosterUrl(movie.poster_path);

        // Create inline keyboard with "Share to Channel" button
        const keyboard = createInlineKeyboard([
            [
                {
                    text: t.shareButton,
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
        await sendMessage(chatId, t.tryAgainLater);
    }
}

/**
 * Handle callback queries (button clicks)
 * Share movie to channel when user clicks the button, or handle language changes
 */
async function handleCallbackQuery(callbackQuery: TelegramCallbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const userId = callbackQuery.from.id;
    const callbackData = callbackQuery.data;

    // Get user's translations
    const t = getTranslation(userId);

    // Handle language selection
    if (callbackData.startsWith('lang_')) {
        const newLang = callbackData.replace('lang_', '') as Language;
        setUserLanguage(userId, newLang);

        // Get new translations
        const newT = getTranslation(userId);

        await answerCallbackQuery(callbackQuery.id, {
            text: newT.languageChanged,
            show_alert: false,
        });

        await sendMessage(chatId, newT.languageChanged);
        return;
    }

    // Answer the callback query immediately
    await answerCallbackQuery(callbackQuery.id, {
        text: t.searching.split(' ')[0], // Just the emoji
    });

    try {
        // Parse callback data to get movie ID
        if (callbackData.startsWith('share_')) {
            const movieId = parseInt(callbackData.replace('share_', ''));

            if (!CHANNEL_USERNAME) {
                await sendMessage(chatId, t.channelNotConfigured);
                return;
            }

            // Fetch full movie details
            const movieDetails = await getMovieDetails(movieId);
            const posterUrl = getPosterUrl(movieDetails.poster_path);

            // Create keyboard with multiple "Watch Movie" options for channel post
            const movieTitle = encodeURIComponent(movieDetails.title);
            const movieYear = movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : '';
            const searchQuery = encodeURIComponent(`${movieDetails.title} ${movieYear} watch online`);

            // Use movie channel with search query if configured, otherwise fallback to Google search
            // URL format: https://t.me/CHANNEL?q=MOVIE_TITLE (searches in channel)
            const watchMovieUrl = MOVIE_CHANNEL
                ? `https://t.me/${MOVIE_CHANNEL.replace('@', '')}?q=${movieTitle}`
                : `https://www.google.com/search?q=${searchQuery}`;

            const watchMovieKeyboard = createInlineKeyboard([
                [
                    {
                        text: t.watchButton,
                        url: watchMovieUrl,
                    },
                ],
                [
                    {
                        text: t.streamingButton,
                        url: `https://www.justwatch.com/us/search?q=${movieTitle}`,
                    },
                    {
                        text: t.moreInfoButton,
                        url: `https://www.themoviedb.org/movie/${movieId}`,
                    },
                ],
            ]);

            // Post to channel with Watch button
            if (posterUrl) {
                await sendPhoto(CHANNEL_USERNAME, posterUrl, {
                    caption: formatChannelCaption(movieDetails),
                    parse_mode: 'HTML',
                    reply_markup: watchMovieKeyboard,
                });
            } else {
                await sendMessage(CHANNEL_USERNAME, formatChannelCaption(movieDetails), {
                    parse_mode: 'HTML',
                    reply_markup: watchMovieKeyboard,
                });
            }

            // Send confirmation to user with button to visit channel
            const channelUrl = `https://t.me/${CHANNEL_USERNAME.replace('@', '')}`;
            const visitChannelKeyboard = createInlineKeyboard([
                [
                    {
                        text: t.visitChannelButton,
                        url: channelUrl,
                    },
                ],
            ]);

            await sendMessage(
                chatId,
                t.successfullyShared.replace('{title}', movieDetails.title) + '\n\n' + t.clickToVisit,
                {
                    parse_mode: 'HTML',
                    reply_markup: visitChannelKeyboard,
                }
            );
        }
    } catch (error: any) {
        console.error('Error handling callback query:', error);

        // Send error message to user
        let errorMessage = t.errorSharing;

        if (error.response?.data?.description) {
            const description = error.response.data.description;

            if (description.includes('bot is not a member')) {
                errorMessage += t.botNotMember;
            } else if (description.includes('not enough rights')) {
                errorMessage += t.notEnoughRights;
            } else {
                errorMessage += `Error: ${description}`;
            }
        } else {
            errorMessage += t.tryAgainLater;
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
