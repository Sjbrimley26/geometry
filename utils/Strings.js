const { multiply, divide } = require("./Math");
const { compact } = require("./Arrays");

const toUpperCase = str => str.toUpperCase()

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const decToPercentage = num => multiply(num)(100) + "%"

const percentToDec = numOrString => {
  const num =
    isNaN(numOrString) ?
    parseFloat(numOrString.slice(0, numOrString.length - 1)) :
    numOrString;
  return divide(num)(100);
}

const beginsWithAndEndsWith = (beginsWith, endsWith) => str => {
  const results = [];
  let string = str;
  let start = string.indexOf(beginsWith);
  while(start > -1) {
    string = string.slice(beginsWith);
    let end = string.indexOf(endsWith);
    if (end) {
      results.push(string.slice(start, end + endsWith.length));
      string = string.slice(end + endsWith.length);
      start = string.indexOf(beginsWith);
    } else {
      start = undefined;
    }
  }
  return results;
}

const split = delimiter => str => str.split(delimiter);

module.exports = {
  toUpperCase,
  decToPercentage,
  percentToDec,
  split,
  capitalize,
  beginsWithAndEndsWith
};
