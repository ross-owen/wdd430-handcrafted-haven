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
  const lastUpdated = seller.modified ? formatDate(new Date(seller.modified)) : '';

  return (
      <div className={styles['seller-wrapper']}>
        <section>
          <h1 className={`${inter.className}`}>
            {seller.firstName} {seller.lastName}
          </h1>
          <div className={styles.fieldset}>
            <h4>Location</h4>
            <p>{seller.location}</p>
          </div>
          <div className={styles.fieldset}>
            <h4>Description</h4>
            <p>{seller.description}</p>
          </div>
          <div className={styles.fieldset}>
            <h4>Member Since</h4>
            <p>{since}</p>
          </div>
          <div className={styles.fieldset}>
            <h4>Last Updated</h4>
            <p>{lastUpdated}</p>
          </div>
        </section>
        <section>
          <Image src={`/images/${seller.profilePic}`} alt={`${seller.firstName} ${seller.lastName}`} width={300}
                 height={450}/>
        </section>
      </div>
  );
}
