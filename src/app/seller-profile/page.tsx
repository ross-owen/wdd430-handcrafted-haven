import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Suspense} from "react";
import SellerProfileDetail from "@/app/ui/seller-profile-detail";

import {fetchSellerByEmail} from "@/app/lib/data";
import { CreateItem } from '@/app/ui/seller-profile/buttons';
import FeaturedItems from "@/app/ui/featured-items";
import ResultsTable from "@/app/ui/browse/results";

export const metadata: Metadata = {
  title: 'Seller Profile',
};

export default async function SellerProfile() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/login');
  }

  const seller = await fetchSellerByEmail(session.user.email);
  if (!seller) {
    redirect('/login');
  }

  return (
      <main>
        <Suspense>
          <SellerProfileDetail seller={seller}/>
        </Suspense>
        <div>
            <h2>My Items</h2>
            <Suspense>
                <ResultsTable query={seller.first_name} currentPage={1} />
            </Suspense>
        </div>
      </main>
  );

}