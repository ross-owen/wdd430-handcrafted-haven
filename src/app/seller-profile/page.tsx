﻿import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import { Suspense, lazy } from "react";
// import SellerProfileDetail from "@/app/ui/seller-profile/seller-profile-detail";
import {fetchSellerByEmail, fetchSellerFilteredDataByEmail, fetchSellerProfilePicByEmail} from "@/app/lib/data";
import ResultsTable from "@/app/ui/browse/results";
import Link from "next/link";
import styles from "@/app/ui/seller-profile/seller.module.css"

const SellerProfileUpdate = lazy(
	() => import('@/app/ui/seller-profile/seller-profile-update')
);

export const metadata: Metadata = {
  title: 'Seller Profile',
};

export default async function SellerProfile() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/login');
  }

  const seller = await fetchSellerFilteredDataByEmail(session.user.email);
  if (!seller) {
    redirect('/login');
  }
  const profile_image = await fetchSellerProfilePicByEmail(session.user.email);
  return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<SellerProfileUpdate
					seller={seller}
					image={`data:image/webp;base64,${Buffer.from(
						profile_image.profile_pic
					).toString('base64')}`}
				/>
			</Suspense>
			<section>
				<div className={styles.items}>
					<h2>My Items</h2>
					<Link className={'a-button'} href="/item/create">
						Add a new item
					</Link>
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