import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./Providers"; 
import "./globals.css";
import Script from "next/script"; // 1. Importamos Script
import { Inter } from 'next/font/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'Free Online Teleprompter - No Install - Perfect for Zoom & YouTube',
    template: '%s | Prompterio'
  },
  description: 'Boost your video confidence with Prompterio. A professional, web-based teleprompter with mirror mode, customizable speed, and cloud sync.',
  keywords: ['teleprompter', 'online teleprompter', 'web teleprompter', 'video creator tools', 'mirror mode teleprompter', 'free teleprompter'],
  authors: [{ name: 'Prompterio Team' }],
  creator: 'Prompterio',
  metadataBase: new URL('https://prompterio.online'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prompterio.online',
    title: 'Prompterio | Professional Web Teleprompter',
    description: 'The easiest way to read your scripts while recording. Built for creators by creators.',
    siteName: 'Prompterio',
    icon: '/favicon.ico', 
    apple: '/apple-touch-icon.png',
    images: [
      {
        url: '/android-chrome-512x512.png', // Tienes que crear esta imagen (1200x630) y ponerla en /public
        width: 1200,
        height: 630,
        alt: 'Prompterio App Preview',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Prompterio | Online Teleprompter',
    description: 'Read scripts like a pro on any device.',
    images: ['/android-chrome-512x512.png.png'],
  },
  robots: {
    index: true,
    follow: true,
  },

};
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>

        
      </body>
    </html>
  );
}



