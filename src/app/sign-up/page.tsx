import Form from '@/app/ui/sign-up/sign-up-form';
import styles from '@/app/ui/sign-up/sign-up-form.module.css';


import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Invoice',
};

export default async function Page() {

	return (
		<main className={styles['main']}>
			<Form />
		</main>
	);
}
