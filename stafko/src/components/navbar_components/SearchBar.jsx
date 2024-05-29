import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
  setSearchTerm,
  searchBarClass = "search-bar-input",
  searchBarDivClass = "search-bar-div",
  searchBarIcon = "search-icon"
}) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={searchBarDivClass}>
      <input
        type="text"
        id="searchbar"
        name="searchbar"
        className={searchBarClass}
        placeholder="Search project..."
        onChange={handleSearchChange}
      />
      <FontAwesomeIcon icon={faSearch} className={searchBarIcon} />
    </div>
  );
}
