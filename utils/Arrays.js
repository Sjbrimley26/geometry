const { sum } = require("./Math");

const uniques = arr => [...new Set(arr)]

const compact = arr => arr.filter(Boolean)

const arrayCount = arr => {
  return arr.reduce((countObj, val) => {
    if (countObj[val]) {
      countObj[val] = countObj[val] + 1;
    } else {
      countObj[val] = 1;
    }
    return countObj;
  }, {});
}

const arrayPercentages = (arr, returnAsStrings = false) => {
  const string = returnAsStrings ? "%" : 0;
  const count = arrayCount(arr);
  const total = sum(Object.values(count));
  return Object.keys(count).reduce((percentageObj, key) => {
    percentageObj[key] = toFixedFloat(count[key] / total * 100, 4) + string;
    return percentageObj;
  }, {});
}

const head = arr => arr[0]
const tail = arr => arr[arr.length - 1]

const range = (min, max, step = 1, mapping = x => x) => {
  const arr = [];
  for (let i = min; i < max; i += step) {
    arr.push(mapping(i));
  }
  return arr;
}

const map = fn => arr => arr.map(fn)
const reduce = (fn, initialVal) => arr => arr.reduce(fn, initialVal)
const filter = fn => arr => arr.filter(fn)
const sort = fn => arr => {
  if (!Array.isArray(arr)) return undefined;
  return [...arr].sort(fn);
}

const flatten = arr => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

module.exports = {
  uniques,
  compact,
  arrayCount,
  arrayPercentages,
  head,
  tail,
  range,
  map,
  filter,
  reduce,
  sort,
  flatten
};
