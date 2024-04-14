'use client';

import useAxiosAuth from '@/hooks/use-axios-auth';
import axios from '@/lib/axios';
import Tippy from '@tippyjs/react';
import { useSession } from 'next-auth/react';
import React, { useState, Fragment, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Dialog, Transition, Tab } from '@headlessui/react';
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof RegisterSchema>;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [modal, setModal] = useState(false);
    const session = useSession();
    const axiosAuth = useAxiosAuth();
    const fetchUsers = async () => {
        try {
            setUsers([]);
            const { data: users } = await axiosAuth.get('/api/users');
            setUsers(users.data.user);
            Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-primary`,
                },
            }).fire({
                title: 'Success get data',
            });
        } catch (error) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-danger`,
                },
            });

            toast.fire({
                title: 'Failed get data',
            });
        }
    };

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            username: '',
            password: '',
            c_password: '',
        },
    });

    const createUser = async (values: FormData) => {
        const { name, username, password } = values;
        try {
            const { data: response } = await axiosAuth.post('api/auth/register', {
                name,
                username,
                password,
            });
            setModal(false);
            reset();
            await fetchUsers();
        } catch (error) {
            console.log(error);
        }
        // await createUserAction(values).then((data)=>{
        // if (data.success) {
        //     console.log(data.success)

        //     setModal(false)
        // } else {
        //     console.log(data.error)
        // }
        // })
    };
    useEffect(() => {}, [users]);
    return (
        <div className="mx-auto mt-4 max-w-[550px]">
            <div className="flex items-center space-x-4">
                <button onClick={() => fetchUsers()} type="button" className="btn btn-primary">
                    Fetch User
                </button>
                <button onClick={() => setModal(!modal)} type="button" className="btn btn-secondary">
                    Create User
                </button>
            </div>

            {/* modal */}
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={() => setModal(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <div className="text-lg font-bold">Create User</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form id="formCreateUser" onSubmit={handleSubmit(createUser)}>
                                                <div className="">
                                                    <div>
                                                        <label htmlFor="username">Username</label>
                                                        <div className={`${errors.username ? 'has-error' : ''} relative text-white-dark`}>
                                                            <input
                                                                {...register('username')}
                                                                id="username"
                                                                type="text"
                                                                placeholder="Enter Username"
                                                                className="form-input placeholder:text-white-dark"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        {errors.username && <div className="mt-1 text-danger">{errors.username.message}</div>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="name">Name</label>
                                                        <div className={`${errors.name ? 'has-error' : ''} relative text-white-dark`}>
                                                            <input
                                                                {...register('name')}
                                                                id="name"
                                                                type="text"
                                                                placeholder="Enter Name"
                                                                className="form-input placeholder:text-white-dark"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        {errors.name && <div className="mt-1 text-danger">{errors.name.message}</div>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password">Password</label>
                                                        <div className={`${errors.password ? 'has-error' : ''} relative text-white-dark`}>
                                                            <input
                                                                {...register('password')}
                                                                id="password"
                                                                type="password"
                                                                placeholder="Enter Password"
                                                                className="form-input placeholder:text-white-dark"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        {errors.password && <div className="mt-1 text-danger">{errors.password.message}</div>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="c_password">Confirm Password</label>
                                                        <div className={`${errors.c_password ? 'has-error' : ''} relative text-white-dark`}>
                                                            <input
                                                                {...register('c_password')}
                                                                id="password"
                                                                type="password"
                                                                placeholder="Enter Confirm Password"
                                                                className="form-input placeholder:text-white-dark"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        {errors.c_password && <div className="mt-1 text-danger">{errors.c_password.message}</div>}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModal(false)}>
                                                Discard
                                            </button>
                                            <button type="submit" form="formCreateUser" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* end modal */}
            <div className="mt-4">
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((data: any, i: number) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="whitespace-nowrap">{data.name}</div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
