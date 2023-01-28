import DICTIONARY from "./dictionary";

const numberInput = document.getElementById("numberInput") as HTMLInputElement;
const result = document.getElementById("result") as HTMLParagraphElement;

numberInput.addEventListener("input", () => {
  const number = numberInput.value;
  const words = number.split(" ");

  try {
    const parsedNumber = parseNumber(DICTIONARY, words);
    result.innerText = parsedNumber.toString();
  } catch (err: any) {
    result.innerText = err.message;
  }
});

console.log(10);

function parseNumber(dict: num[], words: string[]) {
  let total = 0;
  let temp = 0;

  words.forEach((word) => {
    const num = dict.find((n) => n.name === word);
    if (!num) throw new Error(`Invalid word: ${word}`);

    switch (num.math) {
      case "add":
        temp += num.value;
        break;
      case "mul":
        total += temp * num.value;
        temp = 0;
        break;
    }
  });

  return total + temp;
}
