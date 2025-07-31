import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="w-full px-4 py-2 rounded-l-md focus:outline-none text-coffee-brown"
      ></input>
      <button type="submit" className="px-4 py-2 bg-gold-accent text-white rounded-r-md hover:bg-opacity-90 transition">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
