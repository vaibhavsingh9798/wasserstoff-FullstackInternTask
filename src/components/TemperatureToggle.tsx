import React from 'react';

interface TemperatureToggleProps {
  unit: string;
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <button onClick={onToggle} className="p-2 mt-2 bg-gray-200 rounded">
      Switch to °{unit === 'C' ? 'F' : 'C'}
    </button>
  );
};

export default TemperatureToggle;
