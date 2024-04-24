const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{weather.name}</h1>
      <p className="text-lg mb-2">Temperature: {weather.main.temp}°C</p>
      <p className="text-lg mb-2">Weather: {weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="Weather Icon"
        className="w-20 h-20"
      />
    </div>
  );
};

export default WeatherCard;
