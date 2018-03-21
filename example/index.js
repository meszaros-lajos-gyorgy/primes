import {
  canBeDividedWith
} from '../src/helpers'

import {
  startWorker,
  stopWorker,
  increaseLimit,
  getPrimes
} from './worker'

const isPrime = n => increaseLimit(n).then(() => getPrimes().includes(n))

const smallestFactor = n => increaseLimit(n).then(() => isPrime(n) ? n : getPrimes().find(canBeDividedWith(n)))

const testNumbers = [601, 407, 12503, 47, 771, 152691]
const number = testNumbers[0]

startWorker()

Promise.all([isPrime(number), smallestFactor(number)])
  .then(([resultOfIsPrime, resultOfSmallestFactor]) => {
    console.log(`${number} - isPrime: ${resultOfIsPrime}, smallestFactor: ${resultOfSmallestFactor}`)
  })
  .then(() => {
    stopWorker()
  })

// TODO: 152691 is divisable by 3, so fetching all primes until that is nice, but not needed at this point.
// smallestFactor() and isPrime() should work in the following way:
// if we got our number covered in the prime cache, then everything is good to go, we can read out the info as we do now
// else: if only searching the current cache gives back the result, that we need (like 771 can be divided with 3)
//       then return the solution and mark, that we need to extend the prime cache up to 771 by raising the cache limit
//       else ???
