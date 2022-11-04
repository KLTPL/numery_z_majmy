import "./InputNumber.css";

export type InputConfig = {
  defaultValue: number;
  min: number | null;
  max: number | null;
  setFunction: (value: React.SetStateAction<number>) => void;
  additionalOnChangeFunction: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputNumber(inputConfig: InputConfig) {
  return (
    <input
      className="input"
      type="number"
      defaultValue={inputConfig.defaultValue}
      onChange={ev => {
        const min = inputConfig.min; // if min==null => there's no min value
        const max = inputConfig.max; // if max==null => there's no max value
        let num = parseInt(ev.target.value);
        if (isNaN(num)) {
          return;
        }
        if (min !== null && num < min) {
          num = min;
          ev.target.value = min.toString(); // doesn't trigger another onChange
        } else if (max !== null && num > max) {
          num = max;
          ev.target.value = max.toString(); // doesn't trigger another onChange
        }
        inputConfig.setFunction(num);

        if (inputConfig.additionalOnChangeFunction !== null) {
          inputConfig.additionalOnChangeFunction(ev);
        }
      }}
    />
  );
}
