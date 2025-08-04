"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SeachBar";
import { fetchWeatherData } from "../service/api";
import WeatherCalendar from "../components/WeatherCalender";

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

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
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
  };

  return (
    <div>
      <div>
        {/* Header */}
        <div>
          <h1>Weather App</h1>
          <div></div>
          <p>
            Discover the weather forecast for your destination with our beautiful interactive calendar
          </p>
        </div>

        {/* Search Bar */}
        <div>
          <div>
            <h2>Search Weather Forecast</h2>
            <div>
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
          <div>
            {/* Calendar */}
            <div>
              <div>
                <h3>Weather Calendar</h3>
                <div></div>
                <div>
                  <WeatherCalendar weatherData={weatherData} onDateSelect={setSelectedDay} />
                </div>
              </div>
            </div>

            {/* Day Details */}
            <div>
              {selectedDay ? (
                <div>
                  <h2>Weather Details</h2>
                  <div>
                    <div>{selectedDay.date}</div>
                    <img 
                      src={selectedDay.icon}
                      alt={selectedDay.text}
                      width={80}
                      height={80}
                    />
                    <div>{Math.round(selectedDay.avg_temp)}°C</div>
                    <div>{selectedDay.text}</div>
                  </div>

                  <div>
                    <div>
                      <div>Location</div>
                      <div>{destination}</div>
                    </div>
                    <div>
                      <div>Temperature</div>
                      <div>{Math.round(selectedDay.avg_temp)}°C</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div>🌤️</div>
                  <h3>Select a Date</h3>
                  <p>
                    Click on any date in the calendar to view detailed weather information for that day
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {weatherData.length === 0 && !loading && (
          <div>
            <div>🌍</div>
            <h3>Ready to Explore Weather?</h3>
            <p>
              Enter a destination above to see the weather forecast with our interactive calendar
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div>
            <div></div>
            <h3>Fetching Weather Data</h3>
            <p>Please wait while we get the latest forecast...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
