import axios from "axios";

interface WeatherDay {
  date: string;
  icon: string;
  avg_temp: number;
  text: string;
}

interface ForecastDayRaw {
  date: string;
  day: {
    avgtempC: number;
    condition: {
      icon: string;
      text: string;
    };
  };
}

export const fetchWeatherData = async (city: string): Promise<WeatherDay[]> => {
  try {
    const response = await axios.get(
      `https://api.techneapp-staging.site/api/weather/public/forecast-weather?siteCode=whv&q=${encodeURIComponent(
        city
      )}&days=14`
    );

    const forecastDays = response.data.forecast?.forecastday;

    if (!Array.isArray(forecastDays)) {
      throw new Error("forecastday is not an array");
    }

    return forecastDays.map((day: ForecastDayRaw) => ({
      date: day.date,
      icon: `https:${day.day.condition.icon}`,
      avg_temp: day.day.avgtempC,
      text: day.day.condition.text,
    }));
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
