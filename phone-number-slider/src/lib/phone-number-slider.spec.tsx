import { render } from '@testing-library/react';

import PhoneNumberSlider from './phone-number-slider';

describe('PhoneNumberSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhoneNumberSlider />);
    expect(baseElement).toBeTruthy();
  });
});
