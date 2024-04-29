import { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { getUserByUsername } from './data/user';
import { compare } from 'bcryptjs';

export default {
    providers: [
        credentials({
            // @ts-ignore
            authorize: async (credentials) => {
                const validateFields = LoginSchema.safeParse(credentials);
                if (validateFields.success) {
                    const { username, password } = validateFields.data;

                    const user = await getUserByUsername(username)
                    if (!user) return null

                    const passwordMatch = await compare(password, user.password)

                    if (passwordMatch) return user


                    return null

                }
                // throw new Error('User not found.');
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
