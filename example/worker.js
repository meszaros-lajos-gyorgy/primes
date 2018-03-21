import {
  findPrimes
} from '../src/index'

let lastCheckedNumber = 0
let working = true
let speed = 100
let throttle = 1000
let limit = 100
let primes

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
  clearInterval(worker)
}

const increaseLimit = n => {
  let resolver

  if (limit >= n && !working) {
    resolver = Promise.resolve()
  } else {
    working = true
    resolver = new Promise((resolve, reject) => {
      limit = n
      const checker = setInterval(() => {
        if (working === false) {
          clearInterval(checker)
          resolve()
        }
      }, speed)
    })
  }

  return resolver
}

const getPrimes = () => primes

export {
  startWorker,
  stopWorker,
  increaseLimit,
  getPrimes
}
