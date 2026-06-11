export const metadata = {
  title: 'TitanU AI — Agent Fleet',
  description: '106 Autonomous Agents | Google Cloud Rapid Agent Hackathon | Julius Cameron Hill | JCH-2026-001',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: '#080810', color: '#e2e8f0', fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
