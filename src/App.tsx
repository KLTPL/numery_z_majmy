import { useState, useEffect } from "react";
import InputNumber from "./InputNumber";
import "./App.css";
import calcOutput from "./calcOutput";
import calcOutputsFrequencyForYear, {
  calcAmountOfDaysInMonth,
} from "./calcOutputsFrequency";

const AMOUNT_OF_STUDENTS_DEFAULT = 32;

console.table(calcOutputsFrequencyForYear(AMOUNT_OF_STUDENTS_DEFAULT, 2024));

export default function App() {
  const lStorageAmountOfSutdents = parseInt(
    localStorage.getItem("amountOfStudents") as string,
  );
  const lStorageYourNumber = parseInt(
    localStorage.getItem("yourNumber") as string,
  );

  const newDate = new Date();
  const [month, setMonth] = useState(newDate.getMonth() + 1);
  const [date, setDate] = useState(newDate.getDate());
  const [amountOfStudents, setAmountOfStudents] = useState(
    isNaN(lStorageAmountOfSutdents)
      ? AMOUNT_OF_STUDENTS_DEFAULT
      : lStorageAmountOfSutdents,
  );
  const amountOfDaysInMonth = calcAmountOfDaysInMonth(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
  );
  const [yourNumber, setYourNumber] = useState(
    isNaN(lStorageYourNumber) ? 1 : lStorageYourNumber,
  );
  const [amountOfOutputs, setAmountOfOutputs] = useState(
    AMOUNT_OF_STUDENTS_DEFAULT,
  );

  function callCalcOutput() {
    return calcOutput(date, month, amountOfOutputs, amountOfStudents);
  }
  const [output, setOutput] = useState(callCalcOutput);

  useEffect(() => {
    setOutput(callCalcOutput);
  }, [month, date, amountOfStudents, amountOfOutputs]);

  return (
    <>
      <main>
        <h1>Numery na majme</h1>
        <div className="container">
          <div className="input-row">
            <div className="input-container">
              <span className="name">Twój Numer:</span>
              <InputNumber
                {...{
                  defaultValue: yourNumber,
                  min: 1,
                  max: null,
                  setFunction: setYourNumber,
                  additionalOnChangeFunction: (
                    ev: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    const value = ev.target.value;
                    if (!isNaN(parseInt(value))) {
                      localStorage.setItem("yourNumber", value);
                    }
                  },
                }}
              />
            </div>
            <div className="input-container">
              <span className="name">Ilość Numerów:</span>
              <InputNumber
                {...{
                  defaultValue: amountOfOutputs,
                  min: 1,
                  max: 100,
                  setFunction: setAmountOfOutputs,
                  additionalOnChangeFunction: () => {},
                }}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-container">
              <span className="name">Miesiąc:</span>
              <InputNumber
                {...{
                  defaultValue: month,
                  min: 1,
                  max: 12,
                  setFunction: setMonth,
                  additionalOnChangeFunction: () => {},
                }}
              />
            </div>
            <div className="input-container">
              <span className="name">Dzień:</span>
              <InputNumber
                {...{
                  defaultValue: date,
                  min: 1,
                  max: amountOfDaysInMonth,
                  setFunction: setDate,
                  additionalOnChangeFunction: () => {},
                }}
              />
            </div>
            <div className="input-container">
              <span className="name">Ilość Uczniów:</span>
              <InputNumber
                {...{
                  defaultValue: amountOfStudents,
                  min: 1,
                  max: null,
                  setFunction: setAmountOfStudents,
                  additionalOnChangeFunction: (
                    ev: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    const value = ev.target.value;
                    if (!isNaN(parseInt(value))) {
                      localStorage.setItem("amountOfStudents", value);
                    }
                  },
                }}
              />
            </div>
          </div>
          <div className="output-container">
            {output.map((num, i) => {
              return (
                <div className={`number`} key={i}>
                  <span className={num === yourNumber ? "your-num" : ""}>
                    {num}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
