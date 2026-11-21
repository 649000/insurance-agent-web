import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Insurance Portfolio Tracker SG',
  description: 'Manage, aggregate, and identify gaps in Singapore insurance coverage for your family.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-primary">KiteCover SG</span>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                Singapore
              </span>
            </div>
            <nav className="flex items-center space-x-4 text-sm font-medium">
              <span className="text-xs text-muted-foreground">PDPA Compliant (No NRIC)</span>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 sm:px-8 max-w-5xl">
          {children}
        </main>
      </body>
    </html>
  );
}
