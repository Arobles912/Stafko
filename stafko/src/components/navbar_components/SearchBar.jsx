import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
  setSearchTerm,
  searchBarClass = "search-bar-input",
}) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-div">
      <input
        type="text"
        id="searchbar"
        name="searchbar"
        className={searchBarClass}
        placeholder="Search project..."
        onChange={handleSearchChange}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
}
