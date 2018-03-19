const primes = []
let currentNumber = 1

function findPrimes () {
  const maxNumber = currentNumber + 10000

  while (currentNumber < maxNumber) {
    currentNumber++

    var iMax = primes.length
    var found = false

    for (var i = 0; i < iMax; i++) {
      if (currentNumber % primes[i] === 0) {
        found = true
        break
      }
    }

    if (!found) {
      primes.push(currentNumber)
    }
  }

  // setTimeout(findPrimes, 100)
}

findPrimes()
