import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string | undefined;
        username: string;
        name: string
        role: string
    }

    interface Session {
        user?: User;
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        username: string;
        role: string
    }
}
