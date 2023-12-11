import React, { useState, useMemo } from 'react';
import styles from './age-picker.module.scss';

const N_PRIMES = 62;

function findPrimes(N: number) {
  const limit = estimateUpperBoundForNthPrime(N);
  const sieve = new Array(limit).fill(true);
  const primes = [];

  for (let num = 2; num < limit; num++) {
    if (sieve[num]) {
      primes.push(num);
      if (primes.length === N) {
        break;
      }
      for (let multiple = num * num; multiple < limit; multiple += num) {
        sieve[multiple] = false;
      }
    }
  }
  return primes;
}

function estimateUpperBoundForNthPrime(N: number) {
  if (N < 6) {
    return 15;
  }
  return Math.ceil(N * (Math.log(N) + Math.log(Math.log(N))));
}

export const AgePicker: React.FC = () => {
  const [selectedAges, setSelectedAges] = useState<{ [age: number]: boolean }>(
    {}
  );

  const ageRange = findPrimes(N_PRIMES);

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
