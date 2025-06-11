import CreateItemForm from '@/app/ui/seller-profile/create-item-form';
import {fetchCategories, fetchSellerByEmail} from '@/app/lib/data';
import { Metadata } from 'next';
import {auth} from "@/auth";
import {redirect} from "next/navigation";
 
export const metadata: Metadata = {
  title: 'Create Item',
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect('/login');
  }

  const seller = await fetchSellerByEmail(session.user.email);
  if (!seller) {
    redirect('/login');
  }

  const categories = await fetchCategories();
 
  return (
    <main>
      {/*<Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />*/}
      <CreateItemForm categories={categories} seller={seller}/>
    </main>
  );
}