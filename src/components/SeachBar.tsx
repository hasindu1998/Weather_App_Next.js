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
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 max-w-md mx-auto">
      <select
        className="w-full sm:w-64 border border-gray-300 px-4 py-2 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        aria-label="Select destination"
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
        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-md disabled:bg-blue-300 hover:bg-blue-700 transition"
        aria-disabled={!destination || loading}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
