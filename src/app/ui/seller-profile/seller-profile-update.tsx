'use client';

import {inter} from '@/app/ui/fonts';
import styles from './seller.module.css';
import {Seller} from "@/app/lib/definitions";
import Image from "next/image";
import {useActionState} from "react";
import {updateSeller, UpdateSellerState} from "@/app/lib/actions";

interface SellerProfileDetailProps {
  seller: Seller;
}

export default function SellerProfileUpdate({seller}: SellerProfileDetailProps) {
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatLongDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const since = seller.created ? formatDate(new Date(seller.created + 'Z')) : '';
  const lastUpdated = seller.modified ? formatLongDate(new Date(seller.modified + 'Z')) : '';

  const initialState: UpdateSellerState = {message: null, errors: {}};
  const updateSellerWithId = updateSeller.bind(null, seller.id);
  const [state, formAction] = useActionState(updateSellerWithId, initialState);

  return (
		<div className={styles['seller-wrapper']}>
			<section className={styles['near-max-width']}>
				<h1 className={`${inter.className}`}>
					{seller.first_name} {seller.last_name}
				</h1>
				<div className={`${styles['side-by-side']} ${styles['pad-bottom']}`}>
					<div className={styles.fieldset}>
						<h4>Member Since</h4>
						<p>{since}</p>
					</div>
					<div className={styles.fieldset}>
						<h4>Last Updated</h4>
						<p>{lastUpdated}</p>
					</div>
				</div>

				<form action={formAction}>
					<div
						className={`${styles['update-details']} ${styles['pad-bottom']}`}
					>
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							id="first_name"
							name="first_name"
							defaultValue={seller.first_name}
							required
						/>

						<label htmlFor="last_name">Last Name</label>
						<input
							type="text"
							id="last_name"
							name="last_name"
							defaultValue={seller.last_name}
							required
						/>

						<label htmlFor="description">Biography</label>
						<textarea
							id="description"
							name="description"
							defaultValue={seller.description}
							required
						></textarea>

						<label htmlFor="location">Location</label>
						<input
							type="text"
							id="location"
							name="location"
							defaultValue={seller.location}
							required
						/>
					</div>

					<div>
						<button type="submit">Update</button>
						<div>
							{state?.message && (
								<p className="error-message">{state.message}</p>
							)}
						</div>
					</div>
				</form>
			</section>
			<section
				className={`${styles['near-max-width']} ${styles['seller-pic']}`}
			>
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
