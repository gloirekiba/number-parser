import DICTIONARY from "./dictionary.js";

const numberInput = document.getElementById("numberInput") as HTMLInputElement;
const result = document.getElementById("result") as HTMLParagraphElement;

numberInput.addEventListener("input", () => {
  const str = numberInput.value.trim();

  if (!str) {
    result.innerText = "";
    return;
  }

  // Replace hyphens with spaces and "and" with spaces
  // Split the string into an array of words
  const words = str.replace(/-/g, " ").replace(/ and /g, " ").split(" ");

  try {
    const parsedNumber = parseNumber(DICTIONARY, words);
    result.style.color = "black";
    result.innerText = parsedNumber.toString();
  } catch (err: any) {
    result.style.color = "red";
    result.innerText = err.message;
  }
});

function parseNumber(dict: num[], words: string[]): number {
  let total = 0;
  let temp = 0;

  words.forEach((word) => {
    const num = dict.find((n) => n.name === word.toLowerCase());
    if (!num) throw new Error(`Invalid word: ${word}`);

    switch (num.math) {
      case "add":
        temp += num.value;
        break;
      case "mul":
        total += (temp || 1) * num.value;
        temp = 0;
        break;
    }
  });

  return total + temp;
}

/* 

console.log(parseInt("one")); //1
console.log(parseInt("twenty")); //20
console.log(parseInt("two hundred forty-six")); //246
console.log(
  parseInt("seven hundred eighty-three thousand nine hundred nineteen")
);

console.log(parseInt("one hundred and twenty three"));
*/
