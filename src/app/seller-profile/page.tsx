import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Suspense} from "react";
import SellerProfileDetail from "@/app/ui/seller-profile-detail";

import {fetchSellerByEmail} from "@/app/lib/data";
import { CreateItem } from '@/app/ui/seller-profile/buttons';

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
            <h2>Seller Collection</h2>
            <Suspense>
                {/*<SellerCollection />*/}
            </Suspense>
            <CreateItem />
        </div>
      </main>
  );

}