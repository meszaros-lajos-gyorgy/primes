const last = array => array[array.length - 1]

const beforeLast = array => array[array.length - 2]

const clone = array => array.slice(0)

const getLastDigit = number => number.toString()[number.toString().length - 1]

export {
  last,
  beforeLast,
  clone,
  getLastDigit
}
