/**
 * Multi-language support for the Telegram Movie Bot
 * Supports English and Burmese (Myanmar)
 */

export type Language = 'en' | 'my'; // en = English, my = Myanmar/Burmese

export interface Translations {
    welcome: string;
    help: string;
    searching: string;
    noResults: string;
    shareButton: string;
    watchButton: string;
    streamingButton: string;
    moreInfoButton: string;
    visitChannelButton: string;
    successfullyShared: string;
    clickToVisit: string;
    channelNotConfigured: string;
    errorSharing: string;
    botNotMember: string;
    notEnoughRights: string;
    tryAgainLater: string;
    languagePrompt: string;
    languageChanged: string;
    selectLanguage: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        welcome:
            '🎬 Welcome to the Movie Bot!\n\n' +
            'Send me a movie name and I\'ll search for it.\n' +
            'You can then share it to your channel with a single tap!\n\n' +
            'Example: Try searching for "Inception" or "The Matrix"\n\n' +
            '🌐 Use /language to change language',
        help:
            '📖 <b>How to use this bot:</b>\n\n' +
            '1️⃣ Send me a movie name\n' +
            '2️⃣ I\'ll search and show you the details\n' +
            '3️⃣ Click "📢 Share to Channel" to post it\n' +
            '4️⃣ The movie will be shared to your channel!\n\n' +
            '🌐 Use /language to change language\n\n' +
            '<i>Make sure the bot is an admin in your channel.</i>',
        searching: '🔍 Searching for "{query}"...',
        noResults: '❌ No movies found. Please try a different search term.',
        shareButton: '📢 Share to Channel',
        watchButton: '🎬 Watch Movie',
        streamingButton: '📺 Find Streaming',
        moreInfoButton: 'ℹ️ More Info',
        visitChannelButton: '📺 Visit Channel',
        successfullyShared: '✅ Successfully shared "{title}" to the channel!',
        clickToVisit: '👉 Click the button below to visit the channel and see your post!',
        channelNotConfigured: '❌ Channel username not configured. Please set CHANNEL_USERNAME in environment variables.',
        errorSharing: '❌ Failed to share movie to channel.\n\n',
        botNotMember: '⚠️ Bot is not a member of the channel. Please add the bot to your channel and make it an admin.',
        notEnoughRights: '⚠️ Bot doesn\'t have enough permissions. Please make the bot an admin in your channel.',
        tryAgainLater: 'Please try again later.',
        languagePrompt: '🌐 <b>Select your language / ဘာသာစကားရွေးချယ်ပါ</b>\n\nChoose your preferred language:',
        languageChanged: '✅ Language changed to English!',
        selectLanguage: '🌐 Language',
    },
    my: {
        welcome:
            '🎬 ရုပ်ရှင် ဘော့ကို ကြိုဆိုပါတယ်!\n\n' +
            'ရုပ်ရှင်အမည်ပေးပို့ပါ။ ကျွန်တော်ရှာပေးပါမယ်။\n' +
            'ရှာတွေ့ပြီးရင် သင့် channel မှာ တစ်ချက်တည်းမျှဝေနိုင်ပါတယ်!\n\n' +
            'ဥပမာ: "Inception" သို့မဟုတ် "The Matrix" လို့ရှာကြည့်ပါ\n\n' +
            '🌐 ဘာသာစကားပြောင်းဖို့ /language ကိုသုံးပါ',
        help:
            '📖 <b>ဘယ်လိုသုံးရမလဲ:</b>\n\n' +
            '1️⃣ ရုပ်ရှင်အမည်ပေးပို့ပါ\n' +
            '2️⃣ အသေးစိတ်အချက်အလက်ပြပေးပါမယ်\n' +
            '3️⃣ "📢 Channel မှာ မျှဝေမယ်" ကို နှိပ်ပါ\n' +
            '4️⃣ သင့် channel မှာ မျှဝေပေးပါမယ်!\n\n' +
            '🌐 ဘာသာစကားပြောင်းဖို့ /language ကိုသုံးပါ\n\n' +
            '<i>ဘော့ကို channel မှာ admin အဖြစ်ထည့်ထားဖို့ မမေ့ပါနဲ့။</i>',
        searching: '🔍 "{query}" ကို ရှာနေပါတယ်...',
        noResults: '❌ ရုပ်ရှင်မတွေ့ပါ။ အခြားစာသားဖြင့် ပြန်ရှာကြည့်ပါ။',
        shareButton: '📢 Channel မှာ မျှဝေမယ်',
        watchButton: '🎬 ရုပ်ရှင်ကြည့်မယ်',
        streamingButton: '📺 Streaming ရှာမယ်',
        moreInfoButton: 'ℹ️ အသေးစိတ်',
        visitChannelButton: '📺 Channel သို့သွားမယ်',
        successfullyShared: '✅ "{title}" ကို channel မှာ မျှဝေပြီးပါပြီ!',
        clickToVisit: '👉 သင့် channel ကိုသွားကြည့်ရန် အောက်ခလုတ်ကိုနှိပ်ပါ!',
        channelNotConfigured: '❌ Channel အမည် သတ်မှတ်မထားပါ။ CHANNEL_USERNAME ကို environment variables မှာ သတ်မှတ်ပေးပါ။',
        errorSharing: '❌ ရုပ်ရှင်မျှဝေ၍ မရပါ။\n\n',
        botNotMember: '⚠️ ဘော့သည် channel အဖွဲ့ဝင်မဟုတ်ပါ။ ဘော့ကို channel မှာ admin အဖြစ်ထည့်ပေးပါ။',
        notEnoughRights: '⚠️ ဘော့တွင် လုံလောက်သော ခွင့်ပြုချက်မရှိပါ။ ဘော့ကို channel မှာ admin အဖြစ်သတ်မှတ်ပေးပါ။',
        tryAgainLater: 'နောက်မှ ထပ်စမ်းကြည့်ပါ။',
        languagePrompt: '🌐 <b>Select your language / ဘာသာစကားရွေးချယ်ပါ</b>\n\nသင့်နှစ်သက်ရာ ဘာသာစကားရွေးပါ:',
        languageChanged: '✅ မြန်မာဘာသာသို့ ပြောင်းလဲပြီးပါပြီ!',
        selectLanguage: '🌐 ဘာသာစကား',
    },
};

// In-memory storage for user language preferences
// In production, you should use a database
const userLanguages = new Map<number, Language>();

export function getUserLanguage(userId: number): Language {
    return userLanguages.get(userId) || 'en'; // Default to English
}

export function setUserLanguage(userId: number, language: Language): void {
    userLanguages.set(userId, language);
}

export function getTranslation(userId: number): Translations {
    const language = getUserLanguage(userId);
    return translations[language];
}
