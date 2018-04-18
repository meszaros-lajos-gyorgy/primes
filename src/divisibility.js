import {
  getLastDigit
} from './helpers'

const isDivisibleBy = number => divisor => {
  let result

  switch (divisor) {
    case 2: {
      const lastDigit = getLastDigit(number)
      result = lastDigit === '0' || lastDigit === '2' || lastDigit === '4' || lastDigit === '6' || lastDigit === '8'
    }
      break
    case 5: {
      const lastDigit = getLastDigit(number)
      result = lastDigit === '0' || lastDigit === '5'
    }
      break
    default: {
      result = number % divisor === 0
    }
  }

  return result
}

export {
  isDivisibleBy
}
