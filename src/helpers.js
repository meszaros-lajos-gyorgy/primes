const init = arrayOrString => arrayOrString.slice(0, arrayOrString.length - 1)
const last = arrayOrString => arrayOrString[arrayOrString.length - 1]

const beforeLast = arrayOrString => arrayOrString[arrayOrString.length - 2]

const clone = arrayOrString => arrayOrString.slice(0)

const getLastDigit = number => number.toString()[number.toString().length - 1]

const isqrt = x => {
  if (x === 0) {
    return 0
  }
  const tmp = 2 * isqrt(x / 4)
  const tmp2 = tmp + 1
  return x < tmp2 * tmp2 ? tmp : tmp2
}

export {
  init,
  last,
  beforeLast,
  clone,
  getLastDigit,
  isqrt
}
