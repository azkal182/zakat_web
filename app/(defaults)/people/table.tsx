'use client';
import { getAllGroup } from '@/actions/group';
import Dropdown from '@/components/dropdown';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/form';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconSearch from '@/components/icon/icon-search';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconX from '@/components/icon/icon-x';
import IconXCircle from '@/components/icon/icon-x-circle';
import { CreatePeople } from '@/schemas';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Tippy from '@tippyjs/react';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import * as z from 'zod';

type FormType = z.infer<typeof CreatePeople>;
type ReactSelectOption = {
    value: string | number;
    label: string;
};

const PeopleTable = ({ people, groups }: { people: any; groups: any }) => {
    const [modal, setModal] = useState(false);
    const form = useForm<FormType>({
        resolver: zodResolver(CreatePeople),
        defaultValues: {
            name: '',
            description: '',
            rt: '',
            group: '',
        },
    });

    const optionsGroup: ReactSelectOption = _.map(groups, (item) => ({
        value: item.name,
        label: item.name,
    }));
    const onSubmit = async (values: any) => {
        console.log(values);

        // registerUser(values).then((data) => {
        //     if (data.success) {
        //         setModal(false);
        //         reset();
        //     }
        // });
    };
    return (
        <div className="panel">
            <h3 className="mb-3 text-lg font-semibold">Kaum</h3>
            <div className="mb-4.5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center">
                    <button onClick={() => setModal(true)} type="button" className="btn btn-primary m-1 ">
                        Add
                    </button>
                    <button type="button" className="btn btn-primary m-1 ">
                        Print
                    </button>
                    <div className="dropdown">
                        <Dropdown
                            placement={`bottom-start`}
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
                            <th>Description</th>
                            <th>Rt</th>
                            <th>Blok</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((user: any, i: number) => (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>{user.rt_id}</td>
                                <td>{user.group_id}</td>
                                <td className="text-center">
                                    <Tippy content="Delete">
                                        <button>
                                            <IconTrashLines />
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* modal */}
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
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem className="flex">
                                                        <FormLabel className="w-32 py-2">Username</FormLabel>
                                                        <div className={`${form.formState.errors.name ? 'has-error' : ''} w-full`}>
                                                            <FormControl className="">
                                                                <input {...field} type="text" placeholder="John Doe" className={`form-input w-full text-base`} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem className="flex">
                                                        <FormLabel className="w-32 py-2">Description</FormLabel>
                                                        <div className={`${form.formState.errors.description ? 'has-error' : ''} w-full`}>
                                                            <FormControl className="">
                                                                <input {...field} type="text" placeholder="John Doe" className={`form-input w-full text-base`} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="rt"
                                                render={({ field }) => (
                                                    <FormItem className="flex">
                                                        <FormLabel className="w-32 py-2">RT</FormLabel>
                                                        <div className={`${form.formState.errors.rt ? 'has-error' : ''} w-full`}>
                                                            <FormControl className="">
                                                                <input {...field} type="text" placeholder="John Doe" className={`form-input w-full text-base`} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                as="select"
                                                name="group"
                                                render={({ field }) => (
                                                    <FormItem className="flex">
                                                        <FormLabel className="w-32 py-2">Group</FormLabel>
                                                        <div className={`${form.formState.errors.group ? 'has-error' : ''} w-full`}>
                                                            <FormControl>
                                                                {/* <input {...field} type="text" placeholder="John Doe" className={`form-input w-full text-base`} /> */}
                                                                <div className="custom-select">
                                                                    <Select
                                                                        {...field}
                                                                        classNamePrefix="addl-class"
                                                                        options={optionsGroup}
                                                                        value={optionsGroup.find((c: any) => c.value === field.value)}
                                                                        onChange={(val) => {
                                                                            field.onChange(val.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="mt-8 flex items-center justify-end">
                                                <button onClick={() => setModal(false)} type="button" className="btn btn-outline-danger">
                                                    Discard
                                                </button>
                                                <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default PeopleTable;
