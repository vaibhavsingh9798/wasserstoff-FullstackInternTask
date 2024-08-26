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
  const [error,setError] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(false)
 
  const fetchWeatherData = async (city: string, toggle? : boolean) => {
    try {
      if(!toggle)
     setLoading(true)
    setError('')
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
          unit : unit
        }));
      setForecast(dailyForecast);
    } catch (error) {
      setError('Weather data not found. Please check the location.')
    }finally{
       setLoading(false)
    }
  };

  const handleSearch = (city: string) => {
    setCity(city);
    fetchWeatherData(city);
  };

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'C' ? 'F' : 'C'));
    fetchWeatherData(city,true)
  };

  return (
    <div className="p-4 bg-slate-900 text-slate-300 min-h-screen">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
        WeatherVista
      </h1>
      <WeatherForm onSearch={handleSearch} />
      {loading && <div className='flex justify-center text-3xl '>Loading....</div>}
      {currentWeather && (
        <>
          <WeatherCurrent data={currentWeather} />
          <TemperatureToggle unit={unit} onToggle={toggleUnit} />
        </>
      )}
      {forecast.length > 0 && <WeatherForecast forecast={forecast}  />}
      {error && <div className='flex justify-center items-end text-red-500'>{error}</div>}
    </div>
  );
};

export default App;
