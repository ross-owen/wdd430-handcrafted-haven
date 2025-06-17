import {Metadata} from 'next';
import {Suspense, lazy} from "react";
// import Link from "next/link";
import {fetchSellerById} from "@/app/lib/data";
import styles from "@/app/ui/seller-profile/seller.module.css"
import {notFound} from "next/navigation";

const SellerProfileDetail = lazy(
	() => import('@/app/ui/seller-profile/seller-profile-detail')
);
const ResultsTable = lazy(() => import('@/app/ui/browse/results'));

export const metadata: Metadata = {
  title: 'Seller Profile',
};

interface SellerPageProps {
  params: Promise<{
    sellerId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SellerProfilePage({params} : SellerPageProps  ) {
  const resolvedParams = await params;
  let seller;
  try {
    seller = await fetchSellerById(resolvedParams.sellerId);
  } catch (error) {
    console.error("Error retrieving seller details", error);
  }

  if (!seller) {
    notFound();
  }

  return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<SellerProfileDetail seller={seller} />
			</Suspense>
			<section>
				<div className={styles.items}>
					<h2>{seller.first_name}'s Items</h2>
				</div>
				<Suspense fallback={<div>Loading...</div>}>
					<ResultsTable
						query={''}
						seller_id={seller.id}
						category_id={''}
						rating={''}
						currentPage={1}
						random={false}
						price_range={''}
					/>
				</Suspense>
			</section>
		</main>
	);

}