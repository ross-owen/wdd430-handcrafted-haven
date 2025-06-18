import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLogin = nextUrl.pathname === '/login';
            const isOnSignup = nextUrl.pathname === '/sign-up';

            if ((isOnLogin || isOnSignup) && isLoggedIn) {
                return Response.redirect(new URL('/seller-profile', nextUrl));
            }

            return true;
        },
    },
    providers: [],
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;