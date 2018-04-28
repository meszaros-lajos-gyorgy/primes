# Divisibility rules and facts

* 0 can be divided with everything
* a number is divisible by 2, if it's even, thus when it's last digit is 0, 2, 4, 6 or 8
* divisibility of 3 can be checked by doing the following: subtract the quantity of the digits 2, 5, and 8 in the number from the quantity of the digits 1, 4, and 7 in the number. The result must be divisible by 3. ([wikipedia](https://en.wikipedia.org/wiki/Divisibility_rule#Divisibility_rules_for_numbers_1%E2%80%9330))
* divisibility of 5 can be checked for a number by checking, if it's last digit is 0 or 5

There is a general, recursive pattern for checking primes from 7 and above:

1. get the last digit off from the number `N`, which we want to check, if divisible by `P` prime
2. multiply that last digit by a given number (see [divisibility rules for the first 1000 primes](./divisibility-rules-for-the-first-1000-primes.pdf) for the multiplier)
3. add the result to what remained from number `N`
4. the result should be checked, if it is divisible by `P`
5. if the result is still too big, then repeat the process by substituting number `N` with our result from step 3

The smallest results can be checked with a lookup table.

When checking primality: the largest possible divisor of number `N` is `isqrt(N)`, where `isqrt` is the integer part of square root. So divisors of `N` only need to be checked between `2` and `isqrt(N)`.
(see [http://www.nuprl.org/MathLibrary/integer_sqrt/](http://www.nuprl.org/MathLibrary/integer_sqrt/) on how to implement one)
