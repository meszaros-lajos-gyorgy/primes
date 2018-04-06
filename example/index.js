import {
  canBeDividedWith
} from '../src/helpers'

import {
  startWorker,
  stopWorker,
  increaseLimit,
  getPrimes,
  hasLimitBeenReached,
  // addPrime,
  onIdle
} from './worker'

import {
  forEachSeries
} from './async'

const not = fn => (...args) => !fn.apply(fn, args)
const isLesserThanOrEqual = a => b => b <= a

const isPrime = n => {
  if (hasLimitBeenReached(n)) {
    return Promise.resolve(getPrimes().includes(n))
  } else {
    // TODO: if n - lastCheckedNumber < throttle, then don't do the square root thing, since that would break a 1 cycle calculation into 2
    let root = Math.sqrt(n)

    if (Number.isInteger(root)) {
      return Promise.resolve(false)
    } else {
      root = Math.floor(root)
      return increaseLimit(root)
        .then(() => {
          let primes = getPrimes()

          // TODO: if we've just increased the limit, then we don't need slicing
          const lastIndexBeforeRoot = primes.findIndex(not(isLesserThanOrEqual(root)))
          if (lastIndexBeforeRoot !== -1) {
            primes = primes.slice(0, lastIndexBeforeRoot)
          }

          const hasPrimeDivisor = primes.find(canBeDividedWith(n)) !== undefined

          if (hasPrimeDivisor) {
            increaseLimit(n)
          } else {
            increaseLimit(n - 2)
              .then(() => {
                // TODO: the limit can be overriden by another increaseLimit by the time we get here, so the addPrime should more like be a parameter of increaseLimit
                // we would store these found primes separately and insert them as needed
                // addPrime(n) - !!! This is buggy due to the upper reason, disabled it
              })
          }

          return !hasPrimeDivisor
        })
    }
  }
}

const smallestFactor = n => {
  /*
  return increaseLimit(n)
    .then(() => isPrime(n))
    .then(numberIsPrime => numberIsPrime ? n : getPrimes().find(canBeDividedWith(n)))
  */
  return Promise.resolve('---')
}

// primes: 601, 12503, 47
// not primes: 407(11), 771(3), 152691(3)
const testNumbers = [601, 407, 12503, 47, 771, 152691]

startWorker()

forEachSeries(number => {
  return Promise
    .all([isPrime(number), smallestFactor(number)])
    .then(([resultOfIsPrime, resultOfSmallestFactor]) => {
      console.log(`${number} - isPrime: ${resultOfIsPrime}, smallestFactor: ${resultOfSmallestFactor}`)
    })
}, testNumbers)
  .then(onIdle)
  .then(() => {
    stopWorker()
    console.log('done')
  })
