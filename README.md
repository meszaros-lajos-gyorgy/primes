# primes

A collection of tools, which focus on working with prime numbers.

The project aims to create a dynamically expanding lookup table for prime numbers on the backend, which also distributes calculation of new primes to multiple clients through websocket.

## Goals

* tell whether a number is a prime or not
  * if prime, then
    * tell, how [manyeth](https://english.stackexchange.com/questions/21876/how-to-ask-a-question-to-get-an-ordinal-number-answer) it is
    * which primes come before and after it and their distances
  * if not prime, then
    * tell which primes are the closest before and after it and their distances
    * calculate it's prime factorization
    * calculate the smallest and largest divisors
* tell the biggest prime before, and the lowest prime after a given number
* tell how many primes are there before a given number
* tell what the nth prime is based on the given `N`
