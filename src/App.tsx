import { useState, useEffect } from "react";
import InputNumber from "./InputNumber";
import "./App.css";

export default function App() {
  const lStorageAmountOfSutdents = parseInt(
    localStorage.getItem("amountOfStudents") as string
  );
  const lStorageYourNumber = parseInt(
    localStorage.getItem("yourNumber") as string
  );

  const newDate = new Date();
  const [month, setMonth] = useState(newDate.getMonth() + 1);
  const [date, setDate] = useState(newDate.getDate());
  const [amountOfStudents, setAmountOfStudents] = useState(
    isNaN(lStorageAmountOfSutdents) ? 34 : lStorageAmountOfSutdents
  );
  const lastDayOfMonth = new Date(newDate.getFullYear(), month, 0).getDate();
  const [yourNumber, setYourNumber] = useState(
    isNaN(lStorageYourNumber) ? 1 : lStorageYourNumber
  );
  const [amountOfOutputs, setAmountOfOutputs] = useState(30);
  const [output, setOutput] = useState(calcOutput);

  function calcOutput() {
    let tDate = date; // temporaryDate
    let output: number[] = [];

    for (let i = 0; i < amountOfOutputs; i++) {
      while (tDate > amountOfStudents) {
        tDate -= amountOfStudents; // amountOfStudents!=0
      }
      if (!newNumber(tDate, output)) {
        if (output.length >= amountOfStudents) {
          tDate = output[output.length - amountOfStudents]; // repeat numbers by force
        } else {
          // !(output.length>=amountOfStudents) so there must be a number that hasn't been used yet. lets find it!
          do {
            tDate++;
            if (tDate > amountOfStudents) {
              tDate -= amountOfStudents; // amountOfStudents!=0
            }
          } while (!newNumber(tDate, output));
        }
      }
      output.push(tDate);
      tDate += month;
    }
    return output;
  }

  function newNumber(newNum: number, oldNums: number[]) {
    for (let i = 0; i < oldNums.length; i++) {
      if (newNum === oldNums[i]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    setOutput(calcOutput());
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
                    ev: React.ChangeEvent<HTMLInputElement>
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
                  max: lastDayOfMonth,
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
                    ev: React.ChangeEvent<HTMLInputElement>
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
