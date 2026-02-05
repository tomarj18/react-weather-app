const SearchBar = ({ searchInput, setSearchInput, handleSearch }) => {
  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text"
        placeholder="Enter city name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;