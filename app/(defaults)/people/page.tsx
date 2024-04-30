import { getAllPeople } from '@/actions/people';
import React from 'react';
import PeopleTable from './table';
import { getAllGroup } from '@/actions/group';
import ReactSelect from './react-select';

const PeoplePage = async () => {
    const people = await getAllPeople();
    const groups = await getAllGroup();

    return (
        <div>
            <PeopleTable people={people} groups={groups} />
            <ReactSelect groups={groups} />
        </div>
    );
};

export default PeoplePage;
