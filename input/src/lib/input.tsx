import React, { useState, useEffect, useRef } from 'react';
import styles from './input.module.scss';

export const Input: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>(['']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, inputs.length);
  }, [inputs]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value.slice(-1);

    // When typing in the last input field, add a new field
    if (index === inputs.length - 1 && event.target.value !== '') {
      newInputs.push('');
    }

    setInputs(newInputs);

    // If a new input field was added, focus on it
    if (index === inputs.length - 1) {
      setTimeout(() => inputRefs.current[inputs.length]?.focus(), 0);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace' && inputs[index] === '') {
      event.preventDefault();
      // Only remove the input field if it's not the last one
      if (index > 0) {
        const newInputs = [...inputs];
        newInputs.splice(index - 1, 1); // Remove the input field to the left
        setInputs(newInputs);
        // Focus on the previous input field, if it exists
        setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
      }
    }
  };

  return (
    <div className={styles.container}>
      {inputs.map((input, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={input}
          maxLength={1}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={styles.input}
          style={{ width: '1ch' }}
          // Auto-focus new input
          autoFocus={inputs.length - 1 === index}
        />
      ))}
    </div>
  );
};

export default Input;
