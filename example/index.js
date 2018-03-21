import {
  findPrimes
} from '../src/index'

import {
  canBeDividedWith
} from '../src/helpers'

let primes

const isPrime = n => {
  primes = findPrimes(n, primes)
  return primes.includes(n)
}

const smallestFactor = n => {
  primes = findPrimes(n, primes)
  return isPrime(n) ? n : primes.find(canBeDividedWith(n))
}

const testNumbers = [601, 407, 12503, 47, 771, 152691]

testNumbers.forEach(number => {
  console.log(`${number} - isPrime: ${isPrime(number)}, smallestFactor: ${smallestFactor(number)}`)
})

// TODO: 152691 is divisable by 3, so fetching all primes until that is nice, but not needed at this point.
// smallestFactor() and isPrime() should work in the following way:
// if we got our number covered in the prime cache, then everything is good to go, we can read out the info as we do now
// else: if only searching the current cache gives back the result, that we need (like 771 can be divided with 3)
//       then return the solution and mark, that we need to extend the prime cache up to 771 by raising the cache limit
//       else ???
// !! in the background: set an interval for every X milliseconds, which checks, if we need to buff up the cache
//    when the cache limit is not covered by the cache (need to mark last searched value, so that we don't keep re-searching 998, 999 and 1000, when cache limit is 1000)
//    then we steadily increase the cache by some factor (for example: need to search to 100k, but we are at 10k, do +10k every 100ms)
// ??? What if we need the result instantly ???
