export default function calcOutput(
  date: number,
  month: number,
  amountOfOutputs: number,
  amountOfStudents: number
) {
  let tDate = date; // temporaryDate
  let output: number[] = [];

  for (let i = 0; i < amountOfOutputs; i++) {
    while (tDate > amountOfStudents) {
      tDate -= amountOfStudents; // amountOfStudents!=0
    }
    if (!isNumberNew(tDate, output)) {
      if (output.length >= amountOfStudents) {
        tDate = output[output.length - amountOfStudents]; // repeat numbers by force
      } else {
        // !(output.length>=amountOfStudents) so there must be a number that hasn't been used yet. lets find it!
        do {
          tDate++;
          if (tDate > amountOfStudents) {
            tDate -= amountOfStudents; // amountOfStudents!=0
          }
        } while (!isNumberNew(tDate, output));
      }
    }
    output.push(tDate);
    tDate += month;
  }
  return output;
}

function isNumberNew(num: number, oldNums: number[]) {
  for (let i = 0; i < oldNums.length; i++) {
    if (num === oldNums[i]) {
      return false;
    }
  }
  return true;
}
