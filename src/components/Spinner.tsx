import React from "react";

const Spinner = () => {
  return (
    <div className="text-center py-16">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-sky-200 border-t-sky-600 mb-4"></div>
      <h3 className="text-2xl font-bold text-gray-500 mb-2">
        Fetching Weather Data
      </h3>
      <p className="text-gray-400">
        Please wait while we get the latest forecast...
      </p>
    </div>
  );
};

export default Spinner;
