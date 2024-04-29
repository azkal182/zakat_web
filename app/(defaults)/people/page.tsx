import { getAllPeople } from '@/actions/people';
import React from 'react';
import PeopleTable from './table';

const PeoplePage = async () => {
    const people = await getAllPeople();

    return (
        <div>
            <PeopleTable people={people} />
        </div>
    );
};

export default PeoplePage;
