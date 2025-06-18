import { Suspense, lazy } from 'react';

import {
	fetchCategories,
	fetchSellerFilteredDataByEmail,
} from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import styles from '@/app/ui/seller-profile/create.module.css';

const CreateItemForm = lazy(
	() => import('@/app/ui/seller-profile/create-item-form')
);


export const metadata: Metadata = {
	title: 'Create Item',
};

export default async function Page() {
	const session = await auth();

	if (!session || !session.user || !session.user.email) {
		redirect('/login');
	}

	const seller = await fetchSellerFilteredDataByEmail(session.user.email);
	if (!seller) {
		redirect('/login');
	}

	const categories = await fetchCategories();

	return (
		<main className={styles['main']}>
			<Suspense fallback={<div>Loading...</div>}>
				<CreateItemForm categories={categories} seller={seller} />
			</Suspense>
		</main>
	);
}
