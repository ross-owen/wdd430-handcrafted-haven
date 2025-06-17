'use client'

import Link from 'next/link';
import { Suspense, lazy } from 'react';

const Logo = lazy(() => import('@/app/ui/nav/logo'));

export default function Footer({isLoggedIn} : {isLoggedIn: boolean}) {
    return (
			<footer>
				<Suspense fallback={<div>Loading...</div>}>
					<Logo />
				</Suspense>
				{isLoggedIn ? (
					<p>
						<Link href="/seller-profile">My Profile</Link>
					</p>
				) : (
					<p>
						Sign up to be one of our certified artisans{' '}
						<Link href="/sign-up">here</Link>.
					</p>
				)}
			</footer>
		);
}