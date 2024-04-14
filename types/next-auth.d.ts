import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string | undefined;
        username: string;
        access_token: string;
        refresh_token: string;
    }

    interface Session {
        user?: User;
        access_token: string;
        refresh_token: string;
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        username: string;
        access_token: string;
        refresh_token: string;
    }
}
