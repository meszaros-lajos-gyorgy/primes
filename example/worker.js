import {
  findPrimes
} from '../src/index'

let lastCheckedNumber = 0
let working = true
let speed = 100

let limit = 100
let primes

let worker

const engine = () => {
  if(working){
    if(limit > lastCheckedNumber){
      primes = findPrimes(limit, primes)
      lastCheckedNumber = limit // TODO: clamp this to some value, which can easily be done in 100ms, for example 1000
    }else{
      working = false
    }
  }
}

const startWorker = () => {
  if(worker === undefined){
    worker = setInterval(engine, speed)
  }
}

const stopWorker = () => {
  clearInterval(worker)
}

const increaseLimit = n => {
  let resolver

  if(limit >= n && !working){
    resolver = Promise.resolve()
  }else{
    working = true
    resolver = new Promise((resolve, reject) => {
      limit = n
      const checker = setInterval(() => {
        if(working === false){
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
