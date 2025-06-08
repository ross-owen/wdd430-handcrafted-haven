import Form from '@/app/ui/seller-profile/create-item-form';
import { fetchCategories } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Item',
};

export default async function Page() {
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
      <Form categories={categories}/>
    </main>
  );
}