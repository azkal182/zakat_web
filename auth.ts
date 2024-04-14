import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    session: { strategy: 'jwt' },
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // @ts-ignore
        async session({ token, session }) {
            if (session.user) {
                return {
                    ...session,
                    access_token: token.access_token,
                    refresh_token: token.refresh_token,
                    user: {
                        id: token.sub,
                        name: token.name,
                        username: token.username,
                    },
                };
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.sub = user.id;
                token.name = user.name;
                token.username = user.username;
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
            }

            if (trigger === 'update' && session) {
                if (session.access_token) {
                    token.access_token = session.access_token;
                    token.refresh_token = session.refresh_token;
                }
            }
            return token;
        },
    },
    ...authConfig,
});
