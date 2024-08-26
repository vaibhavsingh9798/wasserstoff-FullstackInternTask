import React from 'react';

interface TemperatureToggleProps {
  unit: string;
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <button onClick={onToggle} className="p-2 mt-4  rounded bg-slate-700">
      Switch to °{unit === 'C' ? 'F' : 'C'}
    </button>
  );
};

export default TemperatureToggle;
