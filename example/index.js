import {
  findPrimes
} from '../src/index'

import {
  equals
} from '../src/helpers'

let primes = findPrimes(100)

const isPrime = n => {
  primes = findPrimes(n, primes)
  return primes.find(equals(n)) !== undefined
}

console.log(601, isPrime(601))
console.log(407, isPrime(407))
console.log(12503, isPrime(12503))
console.log(47, isPrime(47))
