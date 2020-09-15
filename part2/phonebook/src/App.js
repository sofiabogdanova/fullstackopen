import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filteredValue, setFilteredValue ] = useState('');

  const [ filteredPersons, setFilteredPersons ] = useState([...persons]);

  const addPerson = (event) => {
    event.preventDefault();
    if(persons.map(p => p.name).includes(newName)) {
        window.alert(`${newName} is already added to phonebook`);
        return;
    }

    const person = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(person));
      if(person.name.toLocaleLowerCase().startsWith(filteredValue.toLocaleLowerCase())) {
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
    const filterValue=event.target.value.toLowerCase();
    const newFilteredPersons=persons.filter((p) => {
        return p.name.toLowerCase().startsWith(filterValue);
    });
    setFilteredPersons(newFilteredPersons);
    setFilteredValue(filterValue);
  }
  
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with: <input value={filteredValue} onChange={filteredValueChange} />
            </div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredPersons.map(p => <div key={p.name}>{p.name} {p.number}</div>)}
        </div>
  )
}

export default App