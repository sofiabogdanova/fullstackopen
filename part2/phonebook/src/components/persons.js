import React from 'react';

const Persons = ({ filteredPersons }) => {
    return (
        <>
            {filteredPersons.map(p => <Person key={p.name} person={p} />)}
        </>);
}

const Person = ({ person }) => {
    return (
        <>
            <div>{person.name} {person.number}</div>
        </>);
}

export default Persons;