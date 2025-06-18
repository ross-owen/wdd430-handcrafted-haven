'use client';

import {inter} from '@/app/ui/fonts';
import styles from './seller.module.css';
import {Seller} from "@/app/lib/definitions";
import Image from "next/image";

interface SellerProfileDetailProps {
  seller: Seller;
}

export default function SellerProfileDetail({seller}: SellerProfileDetailProps) {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const since = seller.created ? formatDate(new Date(seller.created)) : '';

  return (
		<div className={styles['seller-wrapper']}>
			<section>
				<h1 className={`${inter.className}`}>
					{seller.first_name} {seller.last_name}
				</h1>
				<div className={styles.fieldset}>
					<h4>Location</h4>
					<p>{seller.location}</p>
				</div>
				<div className={styles.fieldset}>
					<h4>Biography</h4>
					<p>{seller.description}</p>
				</div>
				<div className={styles.fieldset}>
					<h4>Member Since</h4>
					<p>{since}</p>
				</div>
			</section>
			<section>
				<Image
					src={`data:image/webp;base64,${Buffer.from(seller.profile_pic).toString(
						'base64'
					)}`}
					alt={`${seller.first_name} ${seller.last_name}`}
					width={300}
					height={450}
				/>
			</section>
		</div>
	);
}
