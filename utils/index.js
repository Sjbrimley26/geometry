const Arrays = require("./Arrays")
const Functions = require("./Functions")
const Math = require("./Math")
const Objects = require("./Objects")
const Random = require("./Random")
const Strings = require("./Strings")
const Misc = require("./Misc")

const prettyPrint = obj => {
  console.log(JSON.stringify(obj, null, 2));
  return obj;
};

const trace = x => {
  console.log(x);
  return x;
};

module.exports = {
  Arrays,
  Functions,
  Math,
  Objects,
  Random,
  Strings,
  prettyPrint,
  Misc,
  trace
};
