'use client';

import {inter} from '@/app/ui/fonts';
import {useActionState} from 'react';
import {authenticate} from '@/app/lib/actions';
import {useSearchParams} from 'next/navigation';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/seller-profile';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={formAction}>
            <div>
                <h1 className={`${inter.className}`}>
                    Please log in to continue.
                </h1>
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl}/>
                <button type="submit">Log in</button>
                <div>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                </div>
            </div>
        </form>
    );
}
