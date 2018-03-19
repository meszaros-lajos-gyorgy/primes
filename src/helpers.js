const canBeDividedWith = number => divisor => number % divisor === 0

const last = array => array[array.length - 1]

const beforeLast = array => array[array.length - 2]

const clone = array => array.slice(0)

const endsWith5 = number => number.toString().endsWith('5')

export {
  canBeDividedWith,
  last,
  beforeLast,
  clone,
  endsWith5
}
