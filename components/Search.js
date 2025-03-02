import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { searchSpotify } from "../utils/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const data = await searchSpotify(query);
    setResults(data.tracks?.items || []);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for songs, artists..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <SearchResults results={results} />
    </div>
  );
};

export default Search;
