const primes = [2, 3, 5]

const canBeDividedWith = number => divisor => number % divisor === 0

function findPrimes (currentNumber, to) {
  while (currentNumber < to) {
    if (primes.find(canBeDividedWith(currentNumber)) === undefined) {
      primes.push(currentNumber)
    }

    currentNumber += 2
  }

  // setTimeout(findPrimes, 100)
}

findPrimes(7, 100)

console.log(primes)
