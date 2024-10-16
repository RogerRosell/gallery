import type { Metadata } from "next";
import "./globals.css";
// import { getServerSession } from 'next-auth';
// import SessionProvider from '@/components/SessionProvider';

export const metadata: Metadata = {
  title: "Family Gallery",
  description: "Galeria de fotos de la familia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const session = await getServerSession();
  return (
    <html lang="en">
      <body className="font-sans">
        {/* <SessionProvider session={session}> */}
          <main className="p-32">
            {/* <NavMenu /> */}
            {children}
          </main>          
          {/* </SessionProvider> */}
      </body>
    </html>
  );
}
