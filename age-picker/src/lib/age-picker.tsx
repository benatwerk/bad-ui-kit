import React, { useState, useMemo } from 'react';
import styles from './age-picker.module.scss';

const MIN_AGE = 0;
const MAX_AGE = 200;

export const AgePicker: React.FC = () => {
  const [selectedAges, setSelectedAges] = useState<{ [age: number]: boolean }>(
    {}
  );

  const ageRange = useMemo(() => {
    return Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => i + MIN_AGE);
  }, []);

  const toggleAge = (age: number) => {
    setSelectedAges((prevSelectedAges) => ({
      ...prevSelectedAges,
      [age]: !prevSelectedAges[age],
    }));
  };

  const clearSelection = () => {
    setSelectedAges({});
  };

  const averageAge = useMemo(() => {
    const selectedAgeValues = Object.entries(selectedAges)
      .filter(([_, isSelected]) => isSelected)
      .map(([age]) => parseInt(age));
    const sum = selectedAgeValues.reduce((acc, age) => acc + age, 0);
    const average =
      selectedAgeValues.length > 0 ? sum / selectedAgeValues.length : 0;
    return Math.round(average);
  }, [selectedAges]);

  return (
    <div>
      <div>
        Age: {averageAge}
        <button onClick={clearSelection}>Clear</button>
      </div>
      <div>
        {ageRange.map((age) => (
          <label key={age}>
            <input
              type="checkbox"
              checked={!!selectedAges[age]}
              onChange={() => toggleAge(age)}
            />
            {age}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AgePicker;
