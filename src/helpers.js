const canBeDividedWith = number => divisor => number % divisor === 0

const last = array => array[array.length - 1]

const beforeLast = array => array[array.length - 2]

const clone = array => array.slice(0)

const endsWith = ending => number => number.toString().endsWith(ending.toString())

const equals = a => b => a === b

export {
  canBeDividedWith,
  last,
  beforeLast,
  clone,
  endsWith,
  equals
}
