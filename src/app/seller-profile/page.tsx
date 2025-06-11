import {Metadata} from 'next';
import {auth} from '@/auth';
import {redirect} from 'next/navigation';
import {Suspense} from "react";
import SellerProfileDetail from "@/app/ui/seller-profile-detail";

import {fetchSellerByEmail} from "@/app/lib/data";
import type {Seller} from '@/app/lib/definitions';
import postgres from 'postgres';
// import {snakeToCamel} from '@/app/lib/utils';
import { CreateItem } from '@/app/ui/seller-profile/buttons';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

// async function getSellerByEmail(email: string): Promise<Seller | undefined> {
//   try {
//     const rawRows = await sql<Array<Record<string, string>>>`
//         SELECT id,
//                first_name,
//                last_name,
//                description,
//                location,
//                email,
//                created,
//                modified,
//                profile_pic
//         FROM sellers
//         WHERE email = ${email}
//     `;
//     if (rawRows.length > 0) {
//       return snakeToCamel<Seller>(rawRows[0]);
//     }
//   } catch (error) {
//     console.error('Failed to fetch seller details by email:', error);
//     return undefined;
//   }
// }

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