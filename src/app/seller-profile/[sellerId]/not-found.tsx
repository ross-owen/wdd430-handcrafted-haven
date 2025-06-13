import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon height={100} width={100} />
            <h2>404 Not Found</h2>
            <p>Could not find the requested seller.</p>
            <Link href="/" className={'a-button'}>Go Back</Link>
        </main>
    );
}