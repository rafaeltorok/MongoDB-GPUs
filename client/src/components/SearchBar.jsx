import { useContext } from "react";
import GpuContext from "../GpuContext";

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useContext(GpuContext);

  return (
    <div>
      <input
        id="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
