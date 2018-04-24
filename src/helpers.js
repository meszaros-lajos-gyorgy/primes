const sum = (a, b) => a + b

const init = arrayOrString => arrayOrString.slice(0, arrayOrString.length - 1)
const last = arrayOrString => arrayOrString[arrayOrString.length - 1]

const beforeLast = arrayOrString => arrayOrString[arrayOrString.length - 2]

const clone = arrayOrString => arrayOrString.slice(0)

const getLastDigit = number => number.toString()[number.toString().length - 1]

export {
  sum,
  init,
  last,
  beforeLast,
  clone,
  getLastDigit
}
