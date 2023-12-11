import React, { useState } from 'react';
import styles from './phone-number-slider.module.scss';

/**
 * Format a phone number as a US phone number.
 * @param number The phone number to format.
 * @returns The formatted phone number.
 */
function formatPhoneNumber(number: number): string {
  const strNumber = number.toString();
  const digits = strNumber.replace(/\D/g, '');
  if (digits.length < 7) {
    // Format fewer than 7 digits as-is
    return digits.padStart(4, '0');
  } else if (digits.length <= 7) {
    // Format 7 digits or fewer as local number XXX-XXXX
    return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
  } else if (digits.length <= 10) {
    // Format more than 7 digits but 10 or fewer as US number (XXX) XXX-XXXX
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else {
    // Format more than 10 digits with extra digits in front
    const extra = digits.slice(0, digits.length - 10);
    const mainPart = digits.slice(digits.length - 10);
    return `+${extra} (${mainPart.slice(0, 3)}) ${mainPart.slice(
      3,
      6
    )}-${mainPart.slice(6)}`;
  }
}

const MIN = 0;
const MAX = 999999999999999; // 15 digits

export interface PhoneNumberSliderProps {}

export const PhoneNumberSlider = (props: PhoneNumberSliderProps) => {
  const [sliderValue, setSliderValue] = useState(MIN);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };
  return (
    <div className={styles['container']}>
      <label htmlFor="phoneNumber">Phone Number</label>
      <input
        type="range"
        min={MIN}
        max={MAX}
        defaultValue={sliderValue}
        id="phoneNumber"
        onChange={handleSliderChange}
      />
      <div>{formatPhoneNumber(sliderValue)}</div>
    </div>
  );
};

export default PhoneNumberSlider;
