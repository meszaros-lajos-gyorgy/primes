/* global describe, it */

import assert from 'assert'

import {
  canBeDividedWith,
  last,
  beforeLast,
  clone,
  endsWith5,
  equals
} from '../src/helpers'

describe('canBeDividedWith', () => {
  it('takes a number, then returns a function', () => {
    assert.equal(typeof canBeDividedWith(12), 'function')
  })
  it('takes a second number through the returned function and returns true, when the first number can be divided with it without any remainders', () => {
    assert.deepEqual(canBeDividedWith(20)(5), true)
    assert.deepEqual(canBeDividedWith(100)(4), true)
  })
  it('returns false, when given numbers can only be divided with remainders', () => {
    assert.deepEqual(canBeDividedWith(107)(42), false)
    assert.deepEqual(canBeDividedWith(7)(94), false)
  })
})

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

describe('endsWith5', () => {
  it('returns true, if the given number\'s last digit is 5', () => {
    assert.deepEqual(endsWith5(75), true)
    assert.deepEqual(endsWith5(35), true)
    assert.deepEqual(endsWith5(5), true)
  })
  it('returns false, when given number\'s last digit is different from 5', () => {
    assert.deepEqual(endsWith5(49), false)
    assert.deepEqual(endsWith5(7), false)
    assert.deepEqual(endsWith5(102), false)
  })
})

describe('equals', () => {
  it('takes 2 parameters in a curried fashion and returns true, when both are the same', () => {
    assert.strictEqual(equals(5)(5), true)
  })
  it('returns false, when given parameters differ', () => {
    assert.strictEqual(equals(6)(5), false)
    assert.strictEqual(equals('5')(5), false)
  })
})
