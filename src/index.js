const canBeDividedWith = number => divisor => number % divisor === 0

const last = array => array[array.length - 1]

const endsWith3 = number => number.toString().endsWith('3')

const incrementCandidate = number => number + (endsWith3(number) ? 4 : 2)

function findPrimes (to, primes = [2, 3, 5]) {
  let currentNumber = incrementCandidate(last(primes))

  while (currentNumber < to) {
    if (primes.find(canBeDividedWith(currentNumber)) === undefined) {
      primes.push(currentNumber)
    }

    currentNumber = incrementCandidate(currentNumber)
  }

  return primes
}

const primes = findPrimes(100)

console.log(primes)
