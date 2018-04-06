const wrapInArrayIfNeeded = x => Array.isArray(x) ? x : [x]

const forEachSeries = (fn, [current, ...remaining]) => {
  if (current) {
    return fn.apply(fn, wrapInArrayIfNeeded(current))
      .then(() => {
        if (remaining.length) {
          return forEachSeries(fn, remaining)
        } else {
          return Promise.resolve()
        }
      })
      .catch(err => {
        console.error(err)
      })
  } else {
    return Promise.resolve()
  }
}

export {
  forEachSeries
}
