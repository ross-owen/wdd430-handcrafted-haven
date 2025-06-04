import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { Seller } from '@/app/lib/definitions';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getSeller(email: string): Promise<Seller | undefined> {
    try {
        const seller = await sql<Seller[]>`SELECT * FROM sellers WHERE email=${email}`;
        return seller[0];
    } catch (error) {
        console.error('Failed to fetch seller:', error);
        throw new Error('Failed to fetch seller.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const seller = await getSeller(email);
                    if (!seller) return null;

                    const passwordsMatch = await bcrypt.compare(password, seller.password);
                    if (passwordsMatch) return seller;
                }

                return null;
            },
        }),
    ],
});