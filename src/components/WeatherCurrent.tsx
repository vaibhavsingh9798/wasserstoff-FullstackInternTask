import React from 'react';

interface WeatherCurrentProps {
  data: {
    temperature: number;
    minTemperature: number;
    maxTemperature: number;
    humidity: number;
    windSpeed: number;
    weatherDescription: string;
    weatherIcon: string;
    unit: string;
  };
  
}

const WeatherCurrent: React.FC<WeatherCurrentProps> = ({ data }) => {
  const { temperature, minTemperature, maxTemperature, humidity, windSpeed, weatherDescription, weatherIcon, unit } = data;

  return (
    <div className="p-4 border border-gray-600 rounded">
      <div className="text-xl font-bold">
        {temperature}°{unit}
      </div>
      <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt={weatherDescription} />
      <p>{weatherDescription}</p>
      <p>Min Temp: {minTemperature}°{unit}</p>
      <p>Max Temp: {maxTemperature}°{unit}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
    </div>
  );
};

export default WeatherCurrent;
