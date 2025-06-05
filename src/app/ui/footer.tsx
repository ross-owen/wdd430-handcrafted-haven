'use client'

import Logo from '@/app/ui/nav/logo';
import Link from 'next/link';


export default function Footer() {
    return (
        <footer>
            <Logo />
            <p>Sign up to be one of our certified artisans <Link href="/sign-up">here</Link>.</p>
        </footer>
    )
}