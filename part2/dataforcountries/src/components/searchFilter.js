import React from 'react';

const SearchFilter = ({filteredValue, filteredValueChange}) => {
    return (
      <div>
        find countries <input value={filteredValue} onChange={filteredValueChange} />
      </div>
    );
  }

  export default SearchFilter