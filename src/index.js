const primes = [2, 3, 5]
let currentNumber = 7

const canBeDividedWith = number => divisor => number % divisor === 0

function findPrimes () {
  const maxNumber = currentNumber + 100

  while (currentNumber < maxNumber) {
    const found = primes.find(canBeDividedWith(currentNumber))

    if (found === undefined) {
      primes.push(currentNumber)
    }

    currentNumber += 2
  }

  // setTimeout(findPrimes, 100)
}

findPrimes()

console.log(primes)
