import React, { useState } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherCurrent from './components/WeatherCurrent';
import WeatherForecast from './components/WeatherForecast';
import TemperatureToggle from './components/TemperatureToggle';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [unit, setUnit] = useState<string>('C');

  const fetchWeatherData = async (city: string) => {
    try {
      const apiKey = '537e6051c563f91736440dbf264b012e';
      const currentResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit === 'C' ? 'metric' : 'imperial'}&appid=${apiKey}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit === 'C' ? 'metric' : 'imperial'}&appid=${apiKey}`);

      setCurrentWeather({
        temperature: Math.round(currentResponse.data.main.temp),
        minTemperature: Math.round(currentResponse.data.main.temp_min),
        maxTemperature: Math.round(currentResponse.data.main.temp_max),
        humidity: currentResponse.data.main.humidity,
        windSpeed: currentResponse.data.wind.speed,
        weatherDescription: currentResponse.data.weather[0].description,
        weatherIcon: currentResponse.data.weather[0].icon,
        unit
      });

      const dailyForecast = forecastResponse.data.list.filter((item: any) => item.dt_txt.endsWith('15:00:00'))
        .map((item: any) => ({
          date: item.dt_txt,
          temperature: Math.round(item.main.temp),
          weatherDescription: item.weather[0].description,
          weatherIcon: item.weather[0].icon,
        }));

      setForecast(dailyForecast);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (city: string) => {
    setCity(city);
    fetchWeatherData(city);
  };

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));
    fetchWeatherData(city)
  };

  return (
    <div className="p-4">
      <WeatherForm onSearch={handleSearch} />
      {currentWeather && (
        <>
          <WeatherCurrent data={currentWeather}  />
          <TemperatureToggle unit={unit} onToggle={toggleUnit} />
        </>
      )}
      {forecast.length > 0 && <WeatherForecast forecast={forecast} unit={unit} />}
    </div>
  );
};

export default App;
