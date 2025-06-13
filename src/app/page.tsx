import Hero from '@/app/ui/hero';
import SellerSpotlight from '@/app/ui/seller-spotlight';
import FeaturedItems from '@/app/ui/featured-items';
import ResultsTable from './ui/browse/results';

export default function Home() {
	return (
		<div>
			<main>
				<Hero />
				<SellerSpotlight />
				<ResultsTable query={''} seller_id={''} category_id={''} random={true} currentPage={1} rating={''} />
			</main>
		</div>
	);
}
