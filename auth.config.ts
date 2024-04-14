import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import axios from 'axios';

export default {
    providers: [
        credentials({
            // @ts-ignore
            authorize: async (credentials) => {
                const validateFields = LoginSchema.safeParse(credentials);
                if (validateFields.success) {
                    const { username, password } = validateFields.data;
                    try {
                        const { data: response } = await axios.post(`${process.env.BACKEND_API_URL}/api/auth/login`, {
                            username,
                            password,
                        });
                        let user = response.data;
                        let newUser = user.user;
                        delete user.user;

                        return {
                            ...newUser,
                            ...user,
                        };
                    } catch (error) {
                        if (axios.isAxiosError(error)) {
                            if (error.response?.status === 401) {
                                return null;
                            }
                        }
                        throw error;
                    }
                }
                // throw new Error('User not found.');
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
