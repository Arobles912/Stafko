export default function SearchBar({setSearchTerm, searchBarClass = "search-bar-input"}) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      id="searchbar"
      name="searchbar"
      className={searchBarClass}
      placeholder="Search project..."
      onChange={handleSearchChange}
    />
  );
}
