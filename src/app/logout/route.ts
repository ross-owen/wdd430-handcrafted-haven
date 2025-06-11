import {signOut} from '@/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
    revalidatePath('/', 'layout');
    await signOut({redirectTo: '/login'});
}
