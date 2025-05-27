import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/ui/header";

export const metadata: Metadata = {
  title: "Handcrafted Haven: Artisanal Goods",
  description: "Created for WDD430",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
