import React, { useState, useEffect } from 'react';
import axios from 'axios'

import {Countries, FullCountryInfo} from './components/countries'
import SearchFilter from './components/searchFilter'

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([...countries]);
  const [filteredValue, setFilteredValue] = useState(''); 
  
  
  const filteredValueChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const newFilteredCountries = countries.filter((p) => {
      return p.name.toLowerCase().startsWith(filterValue);
    });
    setFilteredCountries(newFilteredCountries);
    setFilteredValue(filterValue);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
  }, [])
  
  return (
    <>
    <SearchFilter filteredValue={filteredValue} filteredValueChange={filteredValueChange}/>
    {filteredCountries.length>1 && filteredCountries.length<=10 && <Countries countries={filteredCountries}/>}
    {filteredCountries.length>10 && <p>Too many matches, specify another filter</p>}
    {filteredCountries.length===1 && <FullCountryInfo country={filteredCountries[0]}/>}
    </>
  );
}

export default App;
