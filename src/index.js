const canBeDividedWith = number => divisor => number % divisor === 0

const last = array => array[array.length - 1]

const clone = array => array.slice(0)

const endsWith3 = number => number.toString().endsWith('3')

const incrementCandidate = number => number + (endsWith3(number) ? 4 : 2)

function findPrimes (to, primes = [2, 3, 5]) {
  const foundPrimes = clone(primes)
  let currentNumber = incrementCandidate(last(foundPrimes))

  while (currentNumber < to) {
    if (foundPrimes.find(canBeDividedWith(currentNumber)) === undefined) {
      foundPrimes.push(currentNumber)
    }

    currentNumber = incrementCandidate(currentNumber)
  }

  return foundPrimes
}

const primes = findPrimes(100)

console.log(primes)
