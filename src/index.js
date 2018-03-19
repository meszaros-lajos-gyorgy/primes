const primes = []
let currentNumber = 1

function findPrimes () {
  const maxNumber = currentNumber + 10000

  while (currentNumber < maxNumber) {
    currentNumber += 2

    const found = primes.find(prime => currentNumber % prime === 0)

    if (found === undefined) {
      primes.push(currentNumber)
    }
  }

  // setTimeout(findPrimes, 100)
}

findPrimes()
