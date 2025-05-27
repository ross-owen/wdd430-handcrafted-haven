'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Categories() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className="category-dropdown"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<p className="dropdown-title">Categories</p>
			{isOpen && (
				<div className="dropdown-menu">
					<Link href="/browse/jewelry" className="dropdown-link">
						Jewelry
					</Link>
					<Link href="/browse/home-decor" className="dropdown-link">
						Home Decor
					</Link>
					<Link href="/browse/art" className="dropdown-link">
						Art
					</Link>
					<Link href="/browse/clothing" className="dropdown-link">
						Clothing
					</Link>
				</div>
			)}
		</div>
	);
}
