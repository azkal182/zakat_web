'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import IconUser from '../icon/icon-user';
import { login } from '@/actions/login';

const ComponentsAuthLoginForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        await login(values).then((data) => {
            setError('');
            if (data?.error) {
                setError(data.error);
            }
        });
    };

    return (
        <>
            {error && (
                <div className="mb-4 flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light">
                    <span className="ltr:pr-2 rtl:pl-2">
                        <strong className="ltr:mr-1 rtl:ml-1">{error}!</strong>
                    </span>
                </div>
            )}
            <form className="space-y-5 dark:text-white" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="Email">Username</label>
                    <div className={`${errors.username ? 'has-error' : ''} relative text-white-dark`}>
                        <input {...register('username')} id="Email" type="text" placeholder="Enter Username" className="form-input ps-10 placeholder:text-white-dark" />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                            <IconUser fill={true} />
                        </span>
                    </div>
                    {errors.username && <div className="mt-1 text-danger">{errors.username.message}</div>}
                </div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <div className={`${errors.password ? 'has-error' : ''} relative text-white-dark`}>
                        <input {...register('password')} id="Password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark" />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                            <IconLockDots fill={true} />
                        </span>
                    </div>
                    {errors.password && <div className="mt-1 text-danger">{errors.password.message}</div>}
                </div>
                <div>
                    <label className="flex cursor-pointer items-center">
                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                        <span className="text-white-dark">Remember me</span>
                    </label>
                </div>
                <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                    Sign in
                </button>
            </form>
        </>
    );
};

export default ComponentsAuthLoginForm;
