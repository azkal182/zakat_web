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
            if (token) {
                return {
                    ...session,
                    user: {
                        id: token.sub,
                        name: token.name,
                        username: token.username,
                        role: token.role
                    }
                }
            }

            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.username = user.username
                token.role = user.role
                token.sub = user.id
            }

            return token;
        },
    },
    ...authConfig,
});
