# Divisors and multipliers

In the examples below we place the divisors and multipliers on a numberline, from where we can select 3 consecutive segments for our calculations.

## All the divisors of a given number

All divisors of number `N` take place in the range of `2` and `isqrt(N)` (inclusive). If none of those divide `N`, then `N` is a prime. There is a gap between `isqrt(N)` and `N` containing numbers, which don't divide `N`. These 3 sections can be written as follows: `[2..isqrt(N)] [isqrt(N)+1..N-1] [N]`

From these sections above, the first contains primes, as possible divisors, the second has a list of numbers, which are irrelevant to us at the moment, while the last only holds `N`.

## All possible squares for a given divisor (reverse isqrt)

`isqrt(N)` will give the same answer for multiple `N` integers, which **allows us to do primality check parallelly** on them, no `N` will become the divisor of the others.

If we take the largest prime `P` from the 1st section in the previous point, then which numbers (`N`) make `P = isqrt(N)` hold?

The 3 sections in relation of P as follows:

* if `P=2`, then `[P] [P+1..P^2] [P^2+1..(P+1)^2-1]` = `[P] [P+1..P^2] [P^2+1..P^2+2P]` = `[2] [3..4] [5..8]`
* if `P>2`, then `[P] [P+1..P^2+1] [P^2+2..(P+1)^2-1]` = `[P] [P+1..P^2+1] [P^2+2..P^2+2P]`

## Is there a guaranteed prime among the squares of P?

2 is the smallest prime and since it has a single variant for the 3 section distribution of numbers - as seen in the previous section -, we will assume, that `P>2` for all calculations and statements below!

### The sizes of the 2nd and the 3rd sections

Taking `P` as the greatest calculated prime, the section after it contains `P^2-P` numbers, while the 3rd contains `2P-2` = `2(P-1)`. Those two sections add up to `P^2+P-2` = `(P+2)(P-1)` = `P(P+1)-2`.

The sizes of the sections change with every increment of `P`. The 2nd section grows, while the 3rd shrinks. Their percentage ratio is as follows:
( the list also contains non-primes to make the amounts of increment and decrement more obvious )

```
 P | P^2-P       | 2P-2       | P^2+P-2
---+-------------+------------+---------
 3 | 6  | 60%    | 4  | 40%   | 10
 4 | 12 | 66.6%  | 6  | 33.3% | 18
 5 | 20 | 71.4%  | 8  | 28.5% | 28
 6 | 30 | 75%    | 10 | 25%   | 40
 7 | 42 | 77.7%  | 12 | 22.2% | 54
 8 | 56 | 80%    | 14 | 20%   | 70

...

 P   | P^2-P          | 2P-2        | P^2+P-2
-----+----------------+-------------+---------
 97  | 9312  | 97.9%  | 192 | 2.02% | 9504
 101 | 10100 | 98.05% | 194 | 1.94% | 10294
```

We can generate numbers for the 2nd section by taking the difference of the last 2 elements, increment it by 2 and add it to the last element. The initial difference can be calculated by checking the difference betweend the values of `P=3` and `P=4`, which is 6. It is also the number of elements in the 2nd section for `P=3`.

The amounts of the 3rd section grow by 2 in every round, which has an intial value of 4 for `P=3`.

### Bertrand–Chebyshev theorem sizes

For every `N` we can state, that `N < P < 2N`. This means, that the following `2N-2` numbers after `N` always contain at least 1 prime.

This amount matches the 3rd section's size in relation to `P` (`2P-2`), thus **it is guaranteed to have a prime among them**.
