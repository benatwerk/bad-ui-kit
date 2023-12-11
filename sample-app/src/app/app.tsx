// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Input } from '@bad-ui-kit/input';
import { PhoneNumberSlider } from '@bad-ui-kit/phone-number-slider';
import { AgePicker } from '@bad-ui-kit/age-picker';

export function App() {
  return (
    <>
      <h1>Bad UI Kit</h1>
      <div>
        <h2>Input</h2>
        <Input />
      </div>
      <div>
        <h2>Phone Number Slider</h2>
        <PhoneNumberSlider />
      </div>
      <div>
        <h2>Age Picker</h2>
        <AgePicker />
      </div>
    </>
  );
}

export default App;
