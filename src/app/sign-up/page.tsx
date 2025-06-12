import SignUpForm from '@/app/ui/sign-up/sign-up-form';
import styles from '@/app/ui/sign-up/sign-up-form.module.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Seller Sign Up',
};

export default async function Page() {
	return (
		<main className={styles['main']}>
			<SignUpForm />
		</main>
	);
}
