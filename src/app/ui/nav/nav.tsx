import { inter } from '@/app/ui/fonts';
import Link from 'next/link';
import Categories from './categories';

export default function Nav() {
    return (
			<div className="nav-items">
				<Link href="/" className="nav-links">
					Home
				</Link>
				<Categories />
				<Link href="/search" className="nav-links">
					Search
				</Link>
				<Link href="/cart" className="nav-links">
					Cart
				</Link>
			</div>
		);
}