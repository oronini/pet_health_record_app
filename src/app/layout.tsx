import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload: false,
  variable: '--font-noto-sans-jp',
  display: 'swap',
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'ペット体調記録アプリ | プロトタイプ',
  description: 'ペット体調記録アプリ | プロトタイプ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJp.variable}>
        <div className="min-h-screen content-wrapper px-4 text-sm">
          <header className="pt-8 pb-6">
            <div className="flex items-end justify-between">
              <h1 className="text-h1">ペット体調記録アプリ</h1>
              <div className="flex items-center gap-8">
                <Link href="/login" className="flex items-center gap-1">
                  <Image
                    src="images/icons/record_list_icon.svg"
                    alt="記録一覧"
                    width={16}
                    height={16}
                  />
                  記録一覧
                </Link>
                <Link href="/login" className="flex items-center gap-1">
                  <Image
                    src="images/icons/setting_icon.svg"
                    alt="設定"
                    width={16}
                    height={16}
                  />
                  設定
                </Link>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
