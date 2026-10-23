import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NOIR AUTOMOTIVE — Engineered to Move You',
  description: 'Exceptional Chinese engineering. Selected without compromise. A private automotive sourcing and viewing experience.',
  applicationName: 'NOIR AUTOMOTIVE',
  keywords: ['NOIR Automotive', 'Chinese luxury cars', 'private automotive sourcing'],
};
export const viewport: Viewport = { themeColor: '#08090a', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
