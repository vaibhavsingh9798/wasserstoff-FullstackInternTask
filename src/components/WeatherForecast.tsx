import React from 'react';

interface ForecastData {
  date: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
}

interface WeatherForecastProps {
  forecast: ForecastData[];
  unit: string;
}



const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, unit }) => {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
          weekday: 'long', 
          month: 'long',   
          day: 'numeric'  
        });
      };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {forecast.map((item, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded">
          <div className="font-bold">
            {formatDate(item.date)}
          </div>
          <img src={`http://openweathermap.org/img/wn/${item.weatherIcon}.png`} alt={item.weatherDescription} />
          <p>{item.weatherDescription}</p>
          <p>Avg Temp: {item.temperature}°{unit}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
