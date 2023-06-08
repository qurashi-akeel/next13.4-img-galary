import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next 13 image gallery',
  author: 'Qurashi Akeel',
  description:
    'This next app is to understand all the concepts related to the new features in nextjs 13, Not only the app router intead all other features such as new way of doing SSR, ISR, CSR etc...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Navbar />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
