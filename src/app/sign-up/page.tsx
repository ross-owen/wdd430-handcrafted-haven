import { Suspense, lazy } from 'react';

import styles from '@/app/ui/sign-up/sign-up-form.module.css';
import { Metadata } from 'next';

const SignUpForm = lazy(() => import('@/app/ui/sign-up/sign-up-form'));

export const metadata: Metadata = {
	title: 'Seller Sign Up',
};

export default async function Page() {
	return (
		<main className={styles['main']}>
			<Suspense fallback={<div>Loading...</div>}>
				<SignUpForm />
			</Suspense>
		</main>
	);
}
