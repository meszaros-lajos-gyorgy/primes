/* global describe, it */

import assert from 'assert'

import {
  isDivisibleBy
} from '../src/divisibility'

describe('isDivisibleBy', () => {
  it('takes a number, then returns a function', () => {
    assert.equal(typeof isDivisibleBy(12), 'function')
  })
  it('takes a second number through the returned function and returns true, when the first number can be divided with it without any remainders', () => {
    assert.deepEqual(isDivisibleBy(20)(5), true)
    assert.deepEqual(isDivisibleBy(100)(4), true)
  })
  it('returns false, when given numbers can only be divided with remainders', () => {
    assert.deepEqual(isDivisibleBy(107)(42), false)
    assert.deepEqual(isDivisibleBy(7)(94), false)
  })
})
