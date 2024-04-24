import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import axios from "axios";

const WeatherMain = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const apiKey = "ee1f6dedcaf500d67789992a7458f268";

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const fetchWeatherData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url);

        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city) {
      fetchWeatherData();
    } else {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try {
          const response = await axios.get(apiUrl);
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      });
    }

    setLoading(false);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchTerm);
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : weather ? (
        <WeatherCard weather={weather} />
      ) : null}
    </div>
  );
};

export default WeatherMain;
