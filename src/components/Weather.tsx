import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain } from "lucide-react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

export const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2d241ecaf0bc7e8a26840417ec5cd85f&units=metric`
        );
        const data = await response.json();
        setWeather(data);
        console.log("Weather data fetched:", data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="weather-card animate-pulse">
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case "rain":
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      default:
        return <Cloud className="w-12 h-12 text-gray-500" />;
    }
  };

  return (
    <div className="weather-card animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Current Weather</p>
          <h3 className="text-2xl font-semibold mt-1">
            {Math.round(weather.main.temp)}°C
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {weather.weather[0].description}
          </p>
        </div>
        {getWeatherIcon(weather.weather[0].main)}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Humidity: {weather.main.humidity}%
        </p>
      </div>
    </div>
  );
};