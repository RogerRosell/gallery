import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import NavMenu from '@/components/NavMenu';

import { getFilterData } from '@/actions';
import { getUniqueKeywords, getFullGalleryList } from '@/actions/galleryList';
import { getImagesList } from '@/actions/galleryList';
import AppInitialiser from './utils/AppInitialiser';



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
  const filterData = getFilterData();
    const keywords = await getUniqueKeywords();
    const images = await getImagesList();
    const initTree = await getFullGalleryList();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <main className="p-32">
            <NavMenu />
            <AppInitialiser 
            initTree={initTree}
            filterData={filterData}
            keywords={keywords}
            allImages={images}
            filteredImages={images}
          >
            {children}
            </AppInitialiser>
          </main>          
          </SessionProvider>
      </body>
    </html>
  );
}
