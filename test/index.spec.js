/* global describe, it */

import assert from 'assert'

import {
  findPrimes
} from '../src/index'

describe('findPrimes', () => {
  it('should give back an array of primes less than the specified number', () => {
    assert.deepEqual(findPrimes(100), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97])
  })
})
