'use client';

import {inter} from '@/app/ui/fonts';
import {useActionState, useEffect, useRef} from 'react';
import {authenticate} from '@/app/lib/actions';
import {useSearchParams} from 'next/navigation';
import styles from './login.module.css';
import Logo from "@/app/ui/nav/logo";
import {useRouter} from 'next/navigation';


export default function LoginForm() {
  // this bit of code forces a refresh of the routes
  // to make the header show Login vs Logout
  const router = useRouter();
  const hasRefreshed = useRef(false);
  useEffect(() => {
    if (!hasRefreshed.current) {
      router.refresh();
      hasRefreshed.current = true;
      console.log("LoginPage: router.refresh() called once on initial mount.");
    }
  }, [router]);

  // now onto the regular stuff
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/seller-profile';
  const [errorMessage, formAction] = useActionState(
      authenticate,
      undefined,
  );

  return (
      <div className={styles['login-wrapper']}>
        <div>
          <h1 className={`${inter.className}`}>
            Please log in to continue.
          </h1>

          <form action={formAction}>
            <div>
              <div>
                <div className={styles['form-field']}>
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
                <div className={styles['form-field']}>
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
              <div className={styles['form-field']}>
                <button type="submit">Log in</button>
                <div>
                  {errorMessage && (
                      <p className="error-message">{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div>
          <Logo size={'medium'}/>
        </div>
      </div>
  );
}
