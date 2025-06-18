import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isLoggingOut = nextUrl.pathname === '/logout';
            const isOnLogin = nextUrl.pathname === '/login';
            const isOnSignup = nextUrl.pathname === '/sign-up';
            const isOnProfile = nextUrl.pathname === '/seller-profile';

            if (isLoggingOut) {
                return true;
            }

            if ((isOnLogin || isOnSignup) && isLoggedIn) {
                return Response.redirect(new URL('/seller-profile', nextUrl));
            }

            return true;
        },
    },
    providers: [],
    secret: process.env.NEXT_PUBLIC_SECRET,
} satisfies NextAuthConfig;