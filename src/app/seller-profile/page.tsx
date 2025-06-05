import { Metadata } from 'next';
import { CreateItem } from '@/app/ui/seller-profile/buttons';

export const metadata: Metadata = {
    title: 'Login',
}

export default function LoginPage() {
    return (
        <main>
            <div>
                Seller profile
            </div>
            <div>
                <CreateItem />
            </div>          
        </main>
    );
}