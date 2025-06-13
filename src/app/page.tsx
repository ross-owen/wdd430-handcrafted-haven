import Hero from '@/app/ui/hero';
import SellerSpotlight from '@/app/ui/seller-spotlight';
import ResultsTable from './ui/browse/results';
import { Suspense } from 'react';

export default function Home() {
	return (
		<div>
			<main>
				<Hero />
				<SellerSpotlight />
				<Suspense>
					<ResultsTable
						query={''}
						seller_id={''}
						category_id={''}
						random={true}
						currentPage={1}
						rating={''}
					/>
				</Suspense>
			</main>
		</div>
	);
}
