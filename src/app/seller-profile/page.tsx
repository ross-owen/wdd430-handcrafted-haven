import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Suspense} from "react";
import SellerProfileDetail from "@/app/ui/seller-profile-detail";

import {fetchSellerByEmail} from "@/app/lib/data";
import ResultsTable from "@/app/ui/browse/results";
import Link from "next/link";

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
          <Link className={'a-button'} href="/item/create">Add a new item</Link>
        </div>
        <div>
          <h2>My Items</h2>
          <Suspense>
            <ResultsTable query={seller.id} currentPage={1}/>
          </Suspense>
        </div>
      </main>
  );

}