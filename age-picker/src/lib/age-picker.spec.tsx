import { render } from '@testing-library/react';

import AgePicker from './age-picker';

describe('AgePicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AgePicker />);
    expect(baseElement).toBeTruthy();
  });
});
