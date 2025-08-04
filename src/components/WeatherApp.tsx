"use client";

import React, { useState } from "react";
import SearchBar from "./SeachBar";
import { fetchWeatherData } from "../service/api";

interface WeatherDay {
  date: string;
  icon: string;
  avg_temp: number;
  text: string;
}

const WeatherApp = () => {
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherDay[]>([
    {
      date: "",
      icon: "",
      avg_temp: 0,
      text: "",
    },
  ]);

  const handleSearch = async () => {
    if (!destination) return;
    setLoading(true);
    try {
      const weatherInfo = await fetchWeatherData(destination);
      setWeatherData(weatherInfo);
      console.log("Weather data:", weatherInfo);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Weather App</h1>

      <SearchBar
        destination={destination}
        setDestination={setDestination}
        onSearch={handleSearch}
        loading={loading}
      />
    </div>
  );
};

export default WeatherApp;
