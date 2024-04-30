'use client';
import { deleteUser, registerUser, resetUserPassword } from '@/actions/user';
import Dropdown from '@/components/dropdown';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconLock from '@/components/icon/icon-lock';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconSearch from '@/components/icon/icon-search';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconX from '@/components/icon/icon-x';
import IconXCircle from '@/components/icon/icon-x-circle';
import { RegisterSchema } from '@/schemas';
import { IRootState } from '@/store';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as z from 'zod';

type FormType = z.infer<typeof RegisterSchema>;

const TableUsers = ({ users }: { users: any }) => {
    const [modal, setModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userDataToEdit, setUserDataToEdit] = useState(null);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            username: '',
            role: 'USER',
            password: '',
            c_password: '',
        },
    });

    const resetPassword = async (user: any) => {
        Swal.fire({
            icon: 'warning',
            title: `Are you sure want to reset password ${user.name} ?`,
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Reset',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                resetUserPassword(user.id).then((data) => {
                    if (data?.success) {
                        Swal.fire({ title: 'Reset Password!', text: `${user.name} password has been reseted.`, icon: 'success', customClass: 'sweet-alerts' });
                    } else {
                        Swal.fire({ title: 'Reset Password!', text: 'Something went wrong!', icon: 'error', customClass: 'sweet-alerts' });
                    }
                });
            }
        });

        // resetUserPassword(id).then((data) => {
        //     if (data?.success) {
        //         const toast = Swal.mixin({
        //             toast: true,
        //             position: 'bottom-start',
        //             showConfirmButton: false,
        //             timer: 3000,
        //             showCloseButton: true,
        //             customClass: {
        //                 popup: `color-success`,
        //             },
        //         });
        //         toast.fire({
        //             title: 'Reset password successfully!',
        //         });
        //     }
        // });
    };

    const showAllert = (id: string) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure want to delete this?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                deleteUser(id).then((data) => {
                    if (data?.success) {
                        Swal.fire({ title: 'Deleted!', text: 'user has been deleted.', icon: 'success', customClass: 'sweet-alerts' });
                    } else {
                        Swal.fire({ title: 'Deleted!', text: 'Something went wrong!', icon: 'error', customClass: 'sweet-alerts' });
                    }
                });
            }
        });
    };

    const onSubmit = async (values: any) => {
        registerUser(values).then((data) => {
            if (data.success) {
                setModal(false);
                reset();
            }
        });
    };

    const printData = () => {
        var rowhtml = '<h2 style="text-align: center;">' + `Daftar User` + '</h2>';
        rowhtml +=
            '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';

        rowhtml += `
        <th width='30' style='text-align: center;'>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
        `;
        // columns.map((d: any) => {
        //     rowhtml += '<th>' + capitalize(d) + '</th>';
        // });
        rowhtml += '</tr></thead>';
        rowhtml += '<tbody>';
        users.map((item: any, index: number) => {
            rowhtml += '<tr>';
            rowhtml += `<td style='text-align: center';>` + (index + 1) + '</td>';
            rowhtml += '<td>' + item.name + '</td>';
            rowhtml += '<td>' + item.username + '</td>';
            rowhtml += '<td>' + item.role + '</td>';
            rowhtml += '</tr>';
        });
        rowhtml +=
            '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
        rowhtml += '</tbody></table>';
        var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
        winPrint.document.write(
            '<title>Print</title>' +
                `
        <style>
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
</style>
        ` +
                rowhtml
        );
        winPrint.document.close();
        winPrint.focus();
        winPrint.print();
    };
    return (
        <div className="panel">
            <h3 className="mb-3 text-lg font-semibold">Users</h3>
            <div className="mb-4.5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center">
                    <button type="button" className="btn btn-primary m-1 " onClick={() => setModal(true)}>
                        Add
                    </button>
                    <button onClick={() => printData()} type="button" className="btn btn-primary m-1 ">
                        Print
                    </button>
                    <div className="dropdown">
                        <Dropdown
                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                            btnClassName="btn btn-primary m-1  dropdown-toggle "
                            button={
                                <>
                                    Export
                                    <span className="ml-2">
                                        <IconCaretDown />
                                    </span>
                                </>
                            }
                        >
                            <ul className="!min-w-[170px]">
                                <li className="flex">
                                    <button type="button">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                />
                                            </svg>
                                        </span>
                                        CVS
                                    </button>
                                </li>
                                <li className="flex">
                                    <button type="button">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                />
                                            </svg>
                                        </span>
                                        EXCEL
                                    </button>
                                </li>
                                <li className="flex">
                                    <button type="button">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                />
                                            </svg>
                                        </span>
                                        PDF
                                    </button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="relative ml-auto w-full sm:max-w-52">
                    <input
                        type="text"
                        className="peer form-input bg-gray-100 placeholder:tracking-widest sm:bg-transparent ltr:pl-9 ltr:pr-9 ltr:sm:pr-4 rtl:pl-9 rtl:pr-9 rtl:sm:pl-4"
                        placeholder="Search..."
                    />
                    <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
                        <IconSearch className="mx-auto" />
                    </button>
                    <button type="button" className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 sm:hidden ltr:right-2 rtl:left-2">
                        <IconXCircle />
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="mt-2">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, i: number) => (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td className="flex items-center space-x-3 text-center">
                                    <Tippy content="Delete">
                                        <button onClick={() => showAllert(user.id)}>
                                            <IconTrashLines />
                                        </button>
                                    </Tippy>
                                    <Tippy content="Reset Password">
                                        <button onClick={() => resetPassword(user)}>
                                            <IconLock />
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* modal user */}
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" open={modal} onClose={() => setModal(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                        <div className="flex min-h-screen items-start justify-center px-4">
                            <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                    <h5 className="text-lg font-bold">Add User</h5>
                                    <button onClick={() => setModal(false)} type="button" className="text-white-dark hover:text-dark">
                                        <IconX />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <form autoComplete="off" className="space-y-4" id="form-add-user" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-cols-4">
                                            <label className="w-28" htmlFor="name">
                                                Name
                                            </label>
                                            <div className="col-span-3">
                                                <input {...register('name')} id="name" type="text" placeholder="John Doe" className="form-input text-base" />
                                                {errors.name && <div className="mt-1 text-sm text-danger">{errors.name.message}</div>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            <label className="w-28" htmlFor="username">
                                                Username
                                            </label>
                                            <div className="col-span-3">
                                                <input {...register('username')} id="username" type="text" placeholder="John Doe" className="form-input text-base" />
                                                {errors.username && <div className="mt-1 text-sm text-danger">{errors.username.message}</div>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4">
                                            <label className="w-28" htmlFor="username">
                                                Role
                                            </label>
                                            <div className="col-span-3">
                                                <select {...register('role')} className="form-select text-white-dark">
                                                    <option>Open this select menu</option>
                                                    <option value={'ADMIN'}>ADMIN</option>
                                                    <option value={'USER'}>USER</option>
                                                </select>
                                                {errors.role && <div className="mt-1 text-sm text-danger">{errors.role.message}</div>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            <label className="w-28" htmlFor="password">
                                                Password
                                            </label>
                                            <div className="col-span-3">
                                                <input {...register('password')} id="password" type="password" placeholder="******" className="form-input text-base" />
                                                {errors.password && <div className="mt-1 text-sm text-danger">{errors.password.message}</div>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4">
                                            <label className="w-28" htmlFor="c_password">
                                                Confirm Password
                                            </label>
                                            <div className="col-span-3">
                                                {' '}
                                                <input {...register('c_password')} id="c_password" type="password" placeholder="******" className="form-input text-base" />
                                                {errors.c_password && <div className="mt-1 text-sm text-danger">{errors.c_password.message}</div>}
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-8 flex items-center justify-end">
                                        <button onClick={() => setModal(false)} type="button" className="btn btn-outline-danger">
                                            Discard
                                        </button>
                                        <button form="form-add-user" type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* <form className="space-y-5">
                                            <div className="items-center justify-between gap-5 sm:flex md:gap-20">
                                                <label className="w-28" htmlFor="name">
                                                    Name
                                                </label>
                                                <input id="name" type="text" placeholder="John Doe" className="form-input text-base" />
                                            </div>
                                            <div className="items-center justify-between gap-5 sm:flex md:gap-20">
                                                <label className="w-28" htmlFor="username">
                                                    Username
                                                </label>
                                                <input id="username" type="text" placeholder="John Doe" className="form-input text-base" />
                                            </div>
                                            <div className="items-center justify-between gap-5 sm:flex md:gap-20">
                                                <label className="w-28" htmlFor="username">
                                                    Role
                                                </label>
                                                <select className="form-select text-white-dark">
                                                    <option>Open this select menu</option>
                                                    <option>ADMIN</option>
                                                    <option>USER</option>
                                                </select>
                                            </div>
                                        </form> */}
            {/* end modal user */}
        </div>
    );
};

export default TableUsers;
