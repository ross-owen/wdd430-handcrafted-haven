import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnProfile = nextUrl.pathname.startsWith('/seller-profile');
            const isLoggingOut = nextUrl.pathname === '/logout';
            const isOnLogin = nextUrl.pathname === '/login';

            if (isLoggingOut) {
                return true;
            } else if (isOnProfile) {
                return isLoggedIn;
            } else if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL('/seller-profile', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;