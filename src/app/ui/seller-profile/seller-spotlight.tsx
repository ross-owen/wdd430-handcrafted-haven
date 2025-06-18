import {inter} from '@/app/ui/fonts';
import styles from '../home.module.css';
import Image from "next/image";
import {fetchRandomSeller} from "@/app/lib/data";
import Link from "next/link";

export default async function SellerSpotlight() {
    const seller = await fetchRandomSeller();
    console.log()
    return (
			<section className={`${inter.className} ${styles['seller-spotlight']}`}>
				<div className={`${styles['seller-spotlight-wrapper']}`}>
					<h2>Seller spotlight</h2>
					<div className={`${styles['seller-spotlight-detail']}`}>
						<h3>
							{seller.first_name} {seller.last_name}
						</h3>
						<p>{seller.description}</p>
					</div>
					<div className={`${styles['seller-spotlight-detail']}`}>
						<h4>Location</h4>
						<p>{seller.location}</p>
					</div>
					<div className={`${styles['seller-spotlight-detail']}`}>
						<div className={'padding-top'}>
							<Link
								href={`/seller-profile/${seller.id}`}
								className={'a-button'}
								title={`${seller.first_name} ${seller.last_name}'s profile`}
							>
								Visit {seller.first_name}'s Profile
							</Link>
						</div>
					</div>
				</div>
				<div className={`${styles['seller-image-wrapper']}`}>
					<Image
						src={`data:image/webp;base64,${Buffer.from(
							seller.profile_pic
						).toString('base64')}`}
						alt={`${seller.first_name} ${seller.last_name}`}
						width={215}
						height={300}
					/>
				</div>
			</section>
		);
}
