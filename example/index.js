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
