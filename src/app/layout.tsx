import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import NavMenu from '@/components/NavMenu';

export const metadata: Metadata = {
  title: "Family Gallery",
  description: "Galeria de fotos de la familia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="font-sans">
        <SessionProvider session={session}>
          <main className="px-32 py-4">
            <div className='mb-12'><NavMenu /></div>
            {children}
          </main>          
          </SessionProvider>
      </body>
    </html>
  );
}
