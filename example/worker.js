import {
  findPrimes
} from '../src/index'

// global data
let working = true // are we calculating at the moment
let speed = 100 // interval speed in milliseconds
let throttle = 1000 // number of calculations per interval

// base
let lastCheckedNumber = 0 // what is the largest number, that we've checked so far?
let limit = 100 // until what should we raise the lastCheckedNumber?
let primes // list of primes

let worker

const engine = () => {
  if (working) {
    if (limit > lastCheckedNumber) {
      const diff = limit - lastCheckedNumber
      lastCheckedNumber = diff / throttle > 1 ? lastCheckedNumber + throttle : limit
      primes = findPrimes(lastCheckedNumber, primes)
    } else {
      working = false
    }
  }
}

const startWorker = () => {
  if (worker === undefined) {
    worker = setInterval(engine, speed)
  }
}

const stopWorker = () => {
  working = false
  clearInterval(worker)
}

const increaseLimit = n => new Promise((resolve, reject) => {
  // TODO: can we use onIdle() here too?
  if (limit >= n && !working) {
    resolve()
  } else {
    working = true
    limit = n
    const checker = setInterval(() => {
      if (working === false) {
        clearInterval(checker)
        resolve()
      }
    }, speed)
  }
})

const getPrimes = () => primes

const hasLimitBeenReached = () => limit <= lastCheckedNumber && !working

const addPrime = n => {
  limit = n
  lastCheckedNumber = n
  primes.push(n)
}

const onIdle = () => new Promise((resolve, reject) => {
  if (working) {
    const checker = setInterval(() => {
      if (working === false) {
        clearInterval(checker)
        resolve()
      }
    }, speed)
  } else {
    resolve()
  }
})

export {
  startWorker,
  stopWorker,
  increaseLimit,
  getPrimes,
  hasLimitBeenReached,
  addPrime,
  onIdle
}
