'use client'

import Link from "next/link";
import Logo from "@/app/ui/nav/logo";
import { useState } from 'react';
import { usePathname } from "next/navigation";


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    return (
			<header>
				<Logo />
				<div className="nav">
					<button
						className="hamburger-button"
						onClick={() => setMenuOpen((prev) => !prev)}
						aria-label="Toggle menu"
					>
						{menuOpen ? '×' : '☰'}
					</button>

					<ul className={menuOpen ? 'mobile-menu open' : 'mobile-menu'}>
						<li>
							<Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link>
						</li>
						<li>
							<Link href="/browse" className={pathname === "/browse" ? "active" : ""}>Browse</Link>
						</li>
						{/* <li>
							<Link href="/search" className={pathname === "/search" ? "active" : ""}>Search</Link>
						</li> */}
						<li>
							<Link href="/login" className={pathname === "/login" ? "active" : ""}>Seller Login</Link>
						</li>
					</ul>
				</div>
			</header>
		);
}