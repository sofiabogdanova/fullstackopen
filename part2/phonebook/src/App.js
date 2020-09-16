import React, { useState } from 'react'

import PersonForm from './components/personForm'
import Persons from './components/persons'
import SearchFilter from './components/searchFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredValue, setFilteredValue] = useState('');

  const [filteredPersons, setFilteredPersons] = useState([...persons]);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(person));
    if (person.name.toLocaleLowerCase().startsWith(filteredValue.toLocaleLowerCase())) {
      setFilteredPersons(filteredPersons.concat(person))
    }

    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const filteredValueChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const newFilteredPersons = persons.filter((p) => {
      return p.name.toLowerCase().startsWith(filterValue);
    });
    setFilteredPersons(newFilteredPersons);
    setFilteredValue(filterValue);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filteredValue={filteredValue} filteredValueChange={filteredValueChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App