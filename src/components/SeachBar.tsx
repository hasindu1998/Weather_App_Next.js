
import React from "react";

interface Props {
  destination: string;
  setDestination: (dest: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const DESTINATIONS = ["Colombo", "London", "Tokyo", "Paris", "Singapore", "Dubai"];

const SearchBar: React.FC<Props> = ({ destination, setDestination, onSearch, loading }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <select
        className="border px-4 py-2 rounded text-lg"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">Select Destination</option>
        {DESTINATIONS.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button
        onClick={onSearch}
        disabled={!destination || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-blue-300"
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;