import { validateConfig } from '@/lib/config';

export default function Home() {
    const { isValid, errors } = validateConfig();

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">
                        🎬 Telegram Movie Bot
                    </h1>
                    <p className="text-xl text-gray-600">
                        Search and share movies on Telegram
                    </p>
                </div>

                {/* Status Card */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Bot Status</h2>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${isValid ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                            <span className="font-semibold">{isValid ? 'Active' : 'Configuration Error'}</span>
                        </div>
                    </div>

                    {isValid ? (
                        <p className="text-indigo-100">
                            ✅ The bot is properly configured and ready to receive messages!
                        </p>
                    ) : (
                        <div className="bg-red-500 bg-opacity-30 rounded-lg p-4">
                            <p className="font-semibold mb-2">⚠️ Configuration Issues:</p>
                            <ul className="list-disc list-inside space-y-1">
                                {errors.map((error, index) => (
                                    <li key={index} className="text-sm">{error}</li>
                                ))}
                            </ul>
                            <p className="text-sm mt-3 text-indigo-100">
                                Please check your <code className="bg-black bg-opacity-20 px-2 py-1 rounded">.env.local</code> file
                            </p>
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-3xl mb-2">🔍</div>
                        <h3 className="font-bold text-gray-900 mb-1">Movie Search</h3>
                        <p className="text-sm text-gray-600">
                            Search for any movie using the TMDB database
                        </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-3xl mb-2">📢</div>
                        <h3 className="font-bold text-gray-900 mb-1">Share to Channel</h3>
                        <p className="text-sm text-gray-600">
                            One-click sharing to your Telegram channel
                        </p>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="text-3xl mb-2">⚡</div>
                        <h3 className="font-bold text-gray-900 mb-1">Fast & Efficient</h3>
                        <p className="text-sm text-gray-600">
                            Webhook-based for instant responses
                        </p>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                        <div className="text-3xl mb-2">🎨</div>
                        <h3 className="font-bold text-gray-900 mb-1">Rich Formatting</h3>
                        <p className="text-sm text-gray-600">
                            Beautiful messages with posters and details
                        </p>
                    </div>
                </div>

                {/* Instructions */}
                <div className="border-t pt-6">
                    <h3 className="font-bold text-gray-900 mb-3">📖 How to Use</h3>
                    <ol className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <span className="font-bold text-indigo-600 mr-2">1.</span>
                            <span>Search for your bot on Telegram and send <code className="bg-gray-100 px-2 py-1 rounded text-sm">/start</code></span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-indigo-600 mr-2">2.</span>
                            <span>Send a movie name (e.g., "Inception")</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-indigo-600 mr-2">3.</span>
                            <span>View the movie details and poster</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-bold text-indigo-600 mr-2">4.</span>
                            <span>Click "📢 Share to Channel" to post it</span>
                        </li>
                    </ol>
                </div>

                {/* API Endpoints */}
                <div className="border-t pt-6 mt-6">
                    <h3 className="font-bold text-gray-900 mb-3">🔧 API Endpoints</h3>
                    <div className="space-y-2">
                        <a
                            href="/api/webhook"
                            target="_blank"
                            className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-sm text-gray-700">/api/webhook</span>
                                <span className="text-xs text-gray-500">Webhook endpoint</span>
                            </div>
                        </a>
                        <a
                            href="/api/setup-webhook"
                            target="_blank"
                            className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-sm text-gray-700">/api/setup-webhook</span>
                                <span className="text-xs text-gray-500">Webhook configuration</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
                    <p>Built with Next.js 14, Telegram Bot API, and TMDB API</p>
                    <p className="mt-1">Read the <a href="https://github.com" className="text-indigo-600 hover:underline">documentation</a> for setup instructions</p>
                </div>
            </div>
        </main>
    );
}
