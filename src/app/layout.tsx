import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import {auth} from '@/auth';

export const metadata: Metadata = {
  title: "Handcrafted Haven: Artisanal Goods",
  description: "Created for WDD430",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const validSession = !!(session && session.user && session.user.email);

  return (
    <html lang="en">
      <body>
        <Header isLoggedIn={validSession} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
