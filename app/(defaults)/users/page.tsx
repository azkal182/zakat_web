import IconSearch from '@/components/icon/icon-search';
import IconTrash from '@/components/icon/icon-trash';
import IconXCircle from '@/components/icon/icon-x-circle';
import { Metadata } from 'next';
import React from 'react';
import TableUsers from './table';
import { getAllUser } from '@/data/user';

export const metadata: Metadata = {
    title: 'Users',
};
const UsersPage = async () => {
    const users = await getAllUser();

    return <TableUsers users={users} />;
};

export default UsersPage;
