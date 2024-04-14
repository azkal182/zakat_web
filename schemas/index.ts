import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(4),
});

export const RegisterSchema = z
    .object({
        name: z.string().min(1),
        username: z.string().min(1),
        password: z.string().min(4),
        c_password: z.string().min(4),
    })
    .refine((data) => data.password === data.c_password, {
        path: ['c_password'],
        message: 'Passwords does not match',
    });
