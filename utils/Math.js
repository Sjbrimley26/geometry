const { sort } = require("./Arrays");

const toFixedFloat = (num, decimalPlaces) => parseFloat(num.toFixed(decimalPlaces))
const add = x => y => toFixedFloat((x * 100 + y * 100) / 100, 2)
const subtract = x => y => toFixedFloat((x * 100 - y * 100) / 100, 2)
const multiply = x => y => toFixedFloat(x * y, 2)
const divide = x => y => toFixedFloat(x * 100 / (y * 100), 2)
const pow = x => y => toFixedFloat(Math.pow(x, y), 2);
const sqrt = x => toFixedFloat(Math.sqrt(x), 2);
const cos = x => toFixedFloat(Math.cos(x), 2);

const isDivisbleBy = denominator => numerator => numerator % denominator === 0

const sum = (arr, initialVal = 0) => arr.reduce((t, x) => t += x, initialVal)

const mean = arr => divide(sum(arr))(arr.length)

const max = arr => arr.reduce((largest, cur) => cur > largest ? cur : largest, Number.MIN_SAFE_INTEGER)

const min = arr => arr.reduce((smallest, cur) => cur < smallest ? cur : smallest, Number.MAX_SAFE_INTEGER)

const range = arr => {
  const [min, max] = arr.reduce((result, item) => {
    if (result.length === 0) {
      return result.concat(item);
    }
    if (result.length === 1) {
      return result[0] < item
        ? result.concat(item)
        : [item, ...result];
    }
    const [currMin, currMax] = result;
    if (item < currMin) {
      return [item, currMax];
    }
    if (item > currMax) {
      return [currMin, item];
    }
    return result;
  }, []);
  return max - min;
}

const median = arr => { // better when there are outlying values
  const newArr = sort((a, b) => a - b)(arr);
  const middle = Math.floor(arr.length / 2);
  return isDivisbleBy(2)(arr.length) ?
    mean([newArr[middle], newArr[middle - 1]]) :
    newArr[middle];
}

const mode = arr => { // works with non-numbers, good for finding the most "popular" item
  const count = arrayCount(arr);
  const maxCount = max(Object.values(count));
  return keysByValue(count, maxCount);
}

const midRange = arr => mean([max(arr), min(arr)])

// ADVANCED MATH

const variance = arr => {
  const avg = mean(arr);
  return compose(
    x => divide(x)(arr.length),
    sum,
    map(x => (x - avg) ** 2)
  )(arr);
}

const stDev = arr => toFixedFloat(Math.sqrt(variance(arr)), 5)

const factorial = num => {
  if (num <= 0 || isNaN(num)) return undefined;
  let result = 1;
  while (num > 1) {
    result *= num;
    num--;
  }
  return result;
}

const toDegrees = r => r * (180 / Math.PI)

const toRadians = d => d * (Math.PI / 180)

const getHypotenuse = (a, b) => sqrt(pow(a, 2) + pow(b, 2))

module.exports = {
  toFixedFloat,
  add,
  subtract,
  multiply,
  divide,
  isDivisbleBy,
  sum,
  mean,
  max,
  min,
  median,
  mode,
  range,
  midRange,
  variance,
  stDev,
  factorial,
  toRadians,
  toDegrees,
  pow,
  sqrt,
  cos,
  getHypotenuse
};