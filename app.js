"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = __importDefault(require("./dictionary"));
const numberInput = document.getElementById("numberInput");
const result = document.getElementById("result");
numberInput.addEventListener("input", () => {
    const number = numberInput.value;
    const words = number.split(" ");
    try {
        const parsedNumber = parseNumber(dictionary_1.default, words);
        result.innerText = parsedNumber.toString();
    }
    catch (err) {
        result.innerText = err.message;
    }
});
console.log(10);
function parseNumber(dict, words) {
    let total = 0;
    let temp = 0;
    words.forEach((word) => {
        const num = dict.find((n) => n.name === word);
        if (!num)
            throw new Error(`Invalid word: ${word}`);
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
