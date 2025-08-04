"use client";
import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "../components/SeachBar";
import { fetchWeatherData } from "../service/api";
import WeatherCalendar from "../components/WeatherCalendar";
import Image from "next/image";

interface WeatherDay {
  date: string;
  icon: string;
  avg_temp: number;
  text: string;
}

const WeatherApp = () => {
  const [destination, setDestination] = useState("Colombo"); // default city
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<WeatherDay | null>(null);

  
  const handleSearch = useCallback(async () => {
  if (!destination) return;
  setLoading(true);
  try {
    const weatherInfo = await fetchWeatherData(destination);
    setWeatherData(weatherInfo);
    setSelectedDay(null);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  } finally {
    setLoading(false);
  }
}, [destination]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-sky-600 to-yellow-500 bg-clip-text ">
            Weather App
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-sky-400 to-yellow-400 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the weather forecast for your destination with our beautiful interactive calendar
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-sky-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Search Weather Forecast
            </h2>
            <div className="flex justify-center">
              <SearchBar
                destination={destination}
                setDestination={setDestination}
                onSearch={handleSearch}
                loading={loading}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        {weatherData.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calendar */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-sky-100 h-full flex justify-center items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-sky-700 mb-2">Weather Calendar</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-sky-400 rounded-full mx-auto mb-6"></div>
                <div className="max-w-md mx-auto">
                  <WeatherCalendar weatherData={weatherData} onDateSelect={setSelectedDay} />
                </div>
              </div>
            </div>

            {/* Day Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-yellow-100 w-full h-full">
              {selectedDay ? (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Weather Details</h2>
                  <div className="bg-gradient-to-br from-sky-50 to-yellow-50 rounded-2xl p-8 mb-6 border border-sky-200">
                    <div className="text-lg text-sky-600 font-semibold mb-2">{selectedDay.date}</div>
                    <Image 
                      src={selectedDay.icon}
                      alt={selectedDay.text}
                      width={80}
                      height={80}
                      className="mx-auto mb-4 drop-shadow-lg"
                    />
                    <div className="text-4xl font-bold text-sky-700 mb-3">
                      {Math.round(selectedDay.avg_temp)}°C
                    </div>
                    <div className="text-xl text-gray-600 capitalize font-medium mb-4">
                      {selectedDay.text}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
                      <div className="text-sky-600 font-semibold mb-1">Location</div>
                      <div className="text-gray-800 font-bold capitalize">{destination}</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                      <div className="text-yellow-600 font-semibold mb-1">Temperature</div>
                      <div className="text-gray-800 font-bold">{Math.round(selectedDay.avg_temp)}°C</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🌤️</div>
                  <h3 className="text-2xl font-bold text-gray-500 mb-2">Select a Date</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Click on any date in the calendar to view detailed weather information for that day
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {weatherData.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🌍</div>
            <h3 className="text-3xl font-bold text-gray-500 mb-4">Ready to Explore Weather?</h3>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Enter a destination above to see the weather forecast with our interactive calendar
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-sky-200 border-t-sky-600 mb-4"></div>
            <h3 className="text-2xl font-bold text-gray-500 mb-2">Fetching Weather Data</h3>
            <p className="text-gray-400">Please wait while we get the latest forecast...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;