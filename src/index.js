import {
  canBeDividedWith,
  last,
  beforeLast,
  clone,
  endsWith5
} from './helpers'

const findPrimes = (to, primes = [2, 3, 5, 7]) => {
  // let __iterations = 0;

  const foundPrimes = clone(primes)

  let currentNumber = last(foundPrimes)

  let consecutive = currentNumber - 2 === beforeLast(foundPrimes) ? 2 : 1

  currentNumber = currentNumber + 2
  if (endsWith5(currentNumber) || consecutive >= 2) {
    consecutive = 0
    currentNumber += 2
  }

  while (currentNumber <= to) {
    // __iterations++

    if (foundPrimes.find(canBeDividedWith(currentNumber)) === undefined) {
      foundPrimes.push(currentNumber)
      consecutive++
    } else {
      consecutive = 0
    }

    currentNumber = currentNumber + 2
    if (endsWith5(currentNumber) || consecutive >= 2) {
      consecutive = 0
      currentNumber += 2
    }
  }

  // console.log('iterations:', __iterations)

  return foundPrimes
}

export {
  findPrimes
}
