const { compact } = require("./Arrays");

const get = key => obj => obj[key];

const set = (key, value) => obj => {
   obj[key] = value;
   return obj;
}

const map = fn => obj => {
  const newValues = Object.values(obj).map(fn);
  return Object.keys(obj).reduce((newObj, key, i) => {
    newObj[key] = newValues[i];
    return newObj;
  }, {});
}

const keysByValue = (obj, val) => { // returns an array of keys of an object which are the given value
  return compact(Object.keys(obj).map(key => {
    if (obj[key] === val) return key;
  }));
}

const sort = fn => obj => {
  const sorted = [...Object.values(obj)].sort(fn);
  return sorted.reduce((newObj, val) => {
    keysByValue(obj, val).forEach(key => {
      let k = isNaN(parseInt(key)) ? key : "x" + key;
      newObj[k] = val;
    });
    return newObj;
  }, {});
}

module.exports = {
  get,
  set,
  map,
  keysByValue,
  sort
};