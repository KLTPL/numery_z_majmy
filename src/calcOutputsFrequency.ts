import calcOutput from "./calcOutput";

const MONTHS_AMOUNT = 12;

export default function calcOutputsFrequencyForYear(
  amountOfStudents: number,
  year: number
) {
  const frequencies: number[] = [];
  for (let i = 0; i < amountOfStudents; i++) {
    frequencies.push(0);
  }

  for (let month = 1; month <= MONTHS_AMOUNT; month++) {
    const amountOfDays = calcAmountOfDaysInMonth(year, month);
    for (let date = 1; date <= amountOfDays; date++) {
      const output = calcOutput(date, month, 10, amountOfStudents);
      for (const num of output) {
        frequencies[num - 1]++;
      }
    }
  }
  return frequencies;
}

export function calcAmountOfDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
