/* global describe, it */

import assert from 'assert'

import {
  last,
  beforeLast,
  clone,
  getLastDigit
} from '../src/helpers'

describe('last', () => {
  it('returns the last element from the given array', () => {
    assert.equal(last([1, 2, 3, 4]), 4)
  })
})

describe('beforeLast', () => {
  it('returns the 2nd last element from the given array', () => {
    assert.equal(beforeLast([1, 2, 3, 4]), 3)
  })
})

describe('clone', () => {
  it('creates a new array', () => {
    const a = [1, 2, 3, 4]
    assert.notStrictEqual(clone(a), a)
  })
  it('copies the contents of an array', () => {
    const a = [1, 2, 3, 4]
    assert.deepEqual(clone(a), a)
  })
  it('doesn\'t change the contents of the original array', () => {
    const a = [1, 2, 3, 4]
    assert.deepEqual(a, [1, 2, 3, 4])
  })
})

describe('getLastDigit', () => {
  it('takes a number and returns it\'s last digit as a string', () => {
    assert.equal(getLastDigit(127), '7')
    assert.equal(getLastDigit(94), '4')
    assert.equal(getLastDigit(-579), '9')
    assert.equal(getLastDigit(10000), '0')
  })
})
