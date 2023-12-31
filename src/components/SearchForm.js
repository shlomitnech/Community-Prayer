// SearchForm.js
import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [email, setEmail] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(email);
  };

  return (
    <form onSubmit={handleSearch}>
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
