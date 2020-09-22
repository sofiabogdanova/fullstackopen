import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/personForm'
import Persons from './components/persons'
import SearchFilter from './components/searchFilter'

const App = () => {
  const [persons, setPersons] = useState([]);
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

    setNewName('');
    setNewNumber('');
    ////////
    axios
    .post('http://localhost:3001/persons', person)
    .then(response => {
      const createdPerson = response.data;
      setPersons(persons.concat(createdPerson));
      if (createdPerson.name.toLocaleLowerCase().startsWith(filteredValue.toLocaleLowerCase())) {
        setFilteredPersons(filteredPersons.concat(createdPerson))
      }
      console.log(response)
    })
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

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