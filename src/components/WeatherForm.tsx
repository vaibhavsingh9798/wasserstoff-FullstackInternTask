import React, { useState } from 'react';

interface WeatherFormProps {
  onSearch: (city: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center my-4">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-2  border border-gray-300 rounded mb-2 bg-slate-700"
      />
      <button
        type="submit"
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </form>
  );
};

export default WeatherForm;
