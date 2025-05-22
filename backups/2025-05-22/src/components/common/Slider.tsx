import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  className = '',
}) => {
  const [minVal, maxVal] = value;
  const range = max - min;

  const getLeftPosition = () => {
    return ((minVal - min) / range) * 100;
  };

  const getRightPosition = () => {
    return 100 - ((maxVal - min) / range) * 100;
  };

  const getTrackWidth = () => {
    return 100 - getLeftPosition() - getRightPosition();
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), maxVal - step);
    onValueChange([newValue, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), minVal + step);
    onValueChange([minVal, newValue]);
  };

  return (
    <div className={`relative w-full h-5 ${className}`}>
      <div className="absolute w-full h-1 bg-gray-200 rounded top-1/2 transform -translate-y-1/2">
        <div
          className="absolute h-full bg-primary rounded"
          style={{
            left: `${getLeftPosition()}%`,
            width: `${getTrackWidth()}%`,
          }}
        />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={handleMinChange}
        className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none range-input"
        style={{
          WebkitAppearance: 'none',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={handleMaxChange}
        className="absolute w-full h-5 appearance-none bg-transparent pointer-events-none range-input"
        style={{
          WebkitAppearance: 'none',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      <style jsx>{`
        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: all;
          width: 16px;
          height: 16px;
          background-color: white;
          border: 2px solid #3366FF;
          border-radius: 50%;
          cursor: pointer;
        }
        .range-input::-moz-range-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          background-color: white;
          border: 2px solid #3366FF;
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

Slider.displayName = "Slider"; 