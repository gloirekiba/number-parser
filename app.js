import DICTIONARY from "./dictionary.js";
const numberInput = document.getElementById("numberInput");
const result = document.getElementById("result");
numberInput.addEventListener("input", () => {
    const str = numberInput.value.trim();
    if (!str) {
        result.innerText = "";
        return;
    }
    const words = str.replace(/-/g, " ").replace(/ and /g, " ").split(" ");
    try {
        const parsedNumber = parseNumber(DICTIONARY, words);
        result.style.color = "inherit";
        result.innerText = parsedNumber.toString();
    }
    catch (err) {
        result.style.color = "red";
        result.innerText = err.message;
    }
});
function parseNumber(dict, words) {
    let total = 0;
    let temp = 0;
    words.forEach((word) => {
        const num = dict.find((n) => n.name === word.toLowerCase());
        if (!num)
            throw new Error(`Invalid word: ${word}`);
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
