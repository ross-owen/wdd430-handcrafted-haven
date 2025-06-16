import type { Metadata } from "next";
import { Suspense, lazy } from 'react';

import "./globals.css";
const Header = lazy(() => import("@/app/ui/header"))
const Footer = lazy(() => import('@/app/ui/footer'));

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
				<Suspense fallback={<div>Loading...</div>}>
					<Header isLoggedIn={validSession} />
				</Suspense>
				{children}
				<Suspense fallback={<div>Loading...</div>}>
					<Footer isLoggedIn={validSession} />
				</Suspense>
			</body>
		</html>
	);
}
