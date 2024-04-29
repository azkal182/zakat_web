'use client';
import Dropdown from '@/components/dropdown';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconSearch from '@/components/icon/icon-search';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconXCircle from '@/components/icon/icon-x-circle';
import Tippy from '@tippyjs/react';
import React from 'react';

const PeopleTable = ({ people }: { people: any }) => {
    return (
        <div className="panel">
            <h3 className="mb-3 text-lg font-semibold">Kaum</h3>
            <div className="mb-4.5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center">
                    <button type="button" className="btn btn-primary m-1 ">
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
        </div>
    );
};

export default PeopleTable;
