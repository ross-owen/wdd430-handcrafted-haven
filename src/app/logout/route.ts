import {signOut} from '@/auth';

export async function GET() {
    await signOut({redirectTo: '/login'});
    return new Response(null, {status: 200});
}
