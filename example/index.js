import {
  canBeDividedWith
} from '../src/helpers'

import {
  startWorker,
  stopWorker,
  increaseLimit,
  getPrimes,
  hasLimitBeenReached,
  addPrime,
  onIdle
} from './worker'

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
          const hasPrimeDivisor = getPrimes().find(canBeDividedWith(root)) !== undefined

          if (hasPrimeDivisor) {
            increaseLimit(n)
          } else {
            increaseLimit(n - 2)
              .then(() => {
                // TODO: the limit can be overriden by another increaseLimit by the time we get here, so the addPrime should more like be a parameter of increaseLimit
                // we would store these found primes separately and insert them as needed
                addPrime(n)
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
  return Promise.resolve('----')
}

const testNumbers = [601, 407, 12503, 47, 771, 152691]
const number = testNumbers[5]

startWorker()

Promise.all([isPrime(number), smallestFactor(number)])
  .then(([resultOfIsPrime, resultOfSmallestFactor]) => {
    console.log(`${number} - isPrime: ${resultOfIsPrime}, smallestFactor: ${resultOfSmallestFactor}`)
  })
  .then(onIdle)
  .then(() => {
    stopWorker()
    console.log('done')
  })
