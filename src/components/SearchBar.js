import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="search-bar flex">
      <input
        type="text"
        className="news-input"
        id="news-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for news"
      />
      <button onClick={handleSearch} className="search-btn" id="search-btn">
        Search
      </button>
    </div>
  );
};
export default SearchBar;
