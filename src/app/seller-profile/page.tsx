﻿import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Suspense} from "react";
import SellerProfileDetail from "@/app/ui/seller-profile/seller-profile-detail";
import {fetchSellerByEmail} from "@/app/lib/data";
import ResultsTable from "@/app/ui/browse/results";
import Link from "next/link";
import styles from "@/app/ui/seller-profile/seller.module.css"
import SellerProfileUpdate from "@/app/ui/seller-profile/seller-profile-update";

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
          <SellerProfileUpdate seller={seller}/>
        </Suspense>
        <section>
          <div className={styles.items}>
            <h2>My Items</h2>
            <Link className={'a-button'} href="/item/create">Add a new item</Link>
          </div>
          <Suspense>
            <ResultsTable query={''} seller_id={seller.id} category_id={''} rating={''} currentPage={1} random={false} />
          </Suspense>
        </section>
      </main>
  );

}