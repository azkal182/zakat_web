import { Metadata } from 'next';
import React from 'react';
import { auth } from '@/auth';
import Users from './users';

export const metadata: Metadata = {
    title: 'Dashboard',
};

async function page() {
    const session = await auth();
    // console.log(session);

    return (
        <div>
            <div className="panel mx-auto max-w-[550px] space-y-2 divide-y">
                <div className="flex items-center justify-between">
                    <div>Id</div>
                    <div>{session?.user?.id}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Username</div>
                    <div>{session?.user?.username}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>name</div>
                    <div>{session?.user?.name}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Access Token</div>
                    <div className="max-w-96 truncate">{session?.access_token}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Refresh Token</div>
                    <div className="max-w-96 truncate">{session?.refresh_token}</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Expires</div>
                    <div>{session?.expires}</div>
                </div>
                {/* <div>id</div>
                <div className="col-span-2 truncate text-right">{session?.user?.id}</div>
                <div>name</div>
                <div className="col-span-2 text-right">{session?.user?.name}</div>
                <div>username</div>
                <div className="col-span-2 text-right">{session?.user?.username}</div>
                <div>Access Token</div>
                <div className="col-span-2 truncate">{session?.access_token}</div>
                <div>Refresh Token</div>
                <div className="col-span-2 truncate">{session?.refresh_token}</div> */}
            </div>
            <Users />
        </div>
    );
}

export default page;
