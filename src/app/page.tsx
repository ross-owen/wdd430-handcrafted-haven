import { Suspense, lazy } from 'react';

const Hero = lazy(() => import('@/app/ui/hero'));
const SellerSpotlight = lazy(
	() => import('@/app/ui/seller-profile/seller-spotlight')
);
const ResultsTable = lazy(() => import('./ui/browse/results'));

export default function Home() {
	return (
		<main>
			<Suspense fallback={<div>Loading Hero Image...</div>}>
				<Hero />
			</Suspense>
			<Suspense fallback={<div>Loading Seller Spotlight...</div>}>
				<SellerSpotlight />
			</Suspense>
			<Suspense fallback={<div>Loading Featured Items...</div>}>
				<ResultsTable
					query={''}
					seller_id={''}
					category_id={''}
					random={true}
					currentPage={1}
					rating={''}
					price_range={''}
				/>
			</Suspense>
		</main>
	);
}
