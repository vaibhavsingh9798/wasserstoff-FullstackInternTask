import React from 'react';

interface TemperatureToggleProps {
  unit: string;
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <button onClick={onToggle} className="p-3 my-3  text-2xl font-bold  rounded bg-slate-500">
       °{unit === 'C' ? 'F' : 'C'}
    </button>
  );
};

export default TemperatureToggle;
