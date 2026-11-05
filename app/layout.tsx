import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cyber Security Awareness Platform: AI WhatsApp Guardian & Community Scam Defense',
  description:
    'Real-time scam detection and citizen awareness platform targeting Phishing links, Digital Arrest video call extortion, and Malicious predatory loan APKs.',
  keywords: [
    'Cyber Security Awareness',
    'WhatsApp Guardian',
    'Digital Arrest Scam',
    'Phishing Detector',
    'Malicious APK',
    'Community Threat Radar',
    'Indian Cyber Crime 1930',
  ],
  authors: [{ name: 'CyberRaksha AI Collective' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0b141a] text-[#e9edef] min-h-screen">
        {children}
      </body>
    </html>
  );
}

