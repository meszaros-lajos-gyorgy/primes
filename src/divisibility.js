import {
  getLastDigit
} from './helpers'

const isDivisibleBy = number => divisor => {
  let result

  if (number === 0) {
    result = true
  } else {
    switch (divisor) {
      case 2: {
        const lastDigit = getLastDigit(number)
        result = lastDigit === '0' || lastDigit === '2' || lastDigit === '4' || lastDigit === '6' || lastDigit === '8'
      }
        break
      case 3:
        if (number.toString().length > 2) {
          let sumOf147 = number.toString().match(/[147]+/g)
          sumOf147 = sumOf147 === null ? 0 : sumOf147.join('').length

          let sumOf258 = number.toString().match(/[258]+/g)
          sumOf258 = sumOf258 === null ? 0 : sumOf258.join('').length

          result = isDivisibleBy(sumOf147 - sumOf258)(3)
        } else {
          const multiplesUnder100 = [
            3, 6, 9, 12, 15, 18, 21, 24, 27, 30,
            33, 36, 39, 42, 45, 48, 51, 54, 57, 60,
            63, 66, 69, 72, 75, 78, 81, 84, 87, 90,
            93, 96, 99
          ]
          result = multiplesUnder100.includes(number)
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
  }

  return result
}

export {
  isDivisibleBy
}
