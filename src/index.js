const primes = []
let currentNumber = 1

const canBeDividedWith = (number, divisor) => number % divisor === 0

function findPrimes () {
  const maxNumber = currentNumber + 10000

  while (currentNumber < maxNumber) {
    currentNumber += 2

    const found = primes.find(prime => canBeDividedWith(currentNumber, prime))

    if (found === undefined) {
      primes.push(currentNumber)
    }
  }

  // setTimeout(findPrimes, 100)
}

findPrimes()
