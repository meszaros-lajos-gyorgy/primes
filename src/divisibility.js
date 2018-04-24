import {
  sum,
  init,
  last,
  getLastDigit
} from './helpers'

const rules = {
  '7': {multiplier: 2, baseCase: {digits: 2, lookup: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98]}},
  '11': {multiplier: 1, baseCase: {digits: 2, lookup: [11, 22, 33, 44, 55, 66, 77, 88, 99]}},
  '13': {multiplier: 9, baseCase: {digits: 2, lookup: [13, 26, 39, 52, 65, 78, 91]}},
  '17': {multiplier: 5, baseCase: {digits: 2, lookup: [17, 34, 51, 68, 85]}},
  '19': {multiplier: 17, baseCase: {digits: 2, lookup: [19, 38, 57, 76, 95]}}
  /*
  '23': {multiplier: 16, baseCase: {digits: , lookup: []}},
  '29': {multiplier: 26, baseCase: {digits: , lookup: []}},
  '31': {multiplier: 3, baseCase: {digits: , lookup: []}},
  '37': {multiplier: 11, baseCase: {digits: , lookup: []}},
  '41': {multiplier: 4, baseCase: {digits: , lookup: []}},
  '43': {multiplier: 30, baseCase: {digits: , lookup: []}},
  '47': {multiplier: 14, baseCase: {digits: , lookup: []}},
  '53': {multiplier: 37, baseCase: {digits: , lookup: []}},
  '59': {multiplier: 53, baseCase: {digits: , lookup: []}},
  '61': {multiplier: 6, baseCase: {digits: , lookup: []}},
  '67': {multiplier: 20, baseCase: {digits: , lookup: []}},
  '71': {multiplier: 7, baseCase: {digits: , lookup: []}},
  '73': {multiplier: 51, baseCase: {digits: , lookup: []}},
  '79': {multiplier: 71, baseCase: {digits: , lookup: []}},
  '83': {multiplier: 58, baseCase: {digits: , lookup: []}},
  '89': {multiplier: 80, baseCase: {digits: , lookup: []}},
  '97': {multiplier: 29, baseCase: {digits: , lookup: []}},
  */
}

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
          const digits = number.toString().split('')

          const amountOf147 = digits.filter(digit => digit === '1' || digit === '4' || digit === '7').length
          const amountOf258 = digits.filter(digit => digit === '2' || digit === '5' || digit === '8').length

          result = isDivisibleBy(amountOf147 - amountOf258)(3)
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
        if (rules[divisor.toString]) {
          const {multiplier, baseCase: {digits, lookup}} = rules[divisor.toString()]

          if (number.toString().length() > digits) {
            result = isDivisibleBy(multiplier * last(digits) + init(digits).reduce(sum, 0), divisor)
          } else {
            result = lookup.includes(number)
          }
        } else {
          result = number % divisor === 0
        }
      }
    }
  }

  return result
}

export {
  isDivisibleBy
}
