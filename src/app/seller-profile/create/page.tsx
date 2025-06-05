import Form from '@/app/ui/seller-profile/create-item-form';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Item',
};

export default async function Page() {
 
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
      <Form />
    </main>
  );
}