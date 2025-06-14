import {Metadata} from 'next';
import {Suspense} from "react";
import SellerProfileDetail from "@/app/ui/seller-profile/seller-profile-detail";
import ResultsTable from "@/app/ui/browse/results";
import Link from "next/link";
import {fetchSellerById} from "@/app/lib/data";
import styles from "@/app/ui/seller-profile/seller.module.css"
import {notFound} from "next/navigation";

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
        <Suspense>
          <SellerProfileDetail seller={seller}/>
        </Suspense>
        <section>
          <div className={styles.items}>
            <h2>{seller.first_name}'s Items</h2>
          </div>
          <Suspense>
            <ResultsTable query={''} seller_id={seller.id} category_id={''} rating={''} currentPage={1} random={false} />
          </Suspense>
        </section>
      </main>
  );

}