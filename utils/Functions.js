const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

const _pipe = (a, b) => (arg) => b(a(arg));

const pipe = (...ops) => ops.reduce(_pipe)

const unary = fn => arg => fn(arg);

module.exports = {
  compose,
  unary,
  pipe
};
