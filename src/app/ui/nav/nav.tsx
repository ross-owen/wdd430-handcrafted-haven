'use client'

import { inter } from '@/app/ui/fonts';
import Link from 'next/link';

export default function Nav() {
    return (
		<div className="nav nav-items">
			<Link href="/" className="nav-links">
				Home
			</Link>
			<Link href="/browse" className="nav-links">
				Browse
			</Link>
			<Link href="/search" className="nav-links">
				Search
			</Link>
			<Link href="/account" className="nav-links">
				{/* Replace with profile picture */}
				Account
			</Link>
		</div>
	);
}