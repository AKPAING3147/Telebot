import './globals.css'

export const metadata = {
    title: 'Telegram Movie Bot',
    description: 'A Telegram bot for searching and sharing movies',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
