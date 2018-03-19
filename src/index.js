const primes = [2, 3, 5]
let currentNumber = 7

const canBeDividedWith = number => divisor => number % divisor === 0

function findPrimes () {
  const maxNumber = currentNumber + 100

  while (currentNumber < maxNumber) {
    if (primes.find(canBeDividedWith(currentNumber)) === undefined) {
      primes.push(currentNumber)
    }

    currentNumber += 2
  }

  // setTimeout(findPrimes, 100)
}

findPrimes()

console.log(primes)
