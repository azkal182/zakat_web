'use client';

import axios from '@/lib/axios';
import { signIn, useSession } from 'next-auth/react';
export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {
        if (status === 'loading') return; // Tunggu hingga session diinisialisasi

        if (!session) {
            signIn();
            return;
        }

        const { data: response } = await axios.get('/api/auth/refresh', {
            params: {
                refresh_token: session?.refresh_token,
            },
        });
        session.access_token = response.data.access_token;
        update({ access_token: response.data.access_token, refresh_token: response.data.refresh_token });
    };
    return refreshToken;
};
