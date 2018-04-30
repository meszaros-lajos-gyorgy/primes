# Building blocks

## Primality filters

A set of simple tests, which require quick elimination of non-primes from possible prime candidates.

The tests are based on the [general properties of primes](./general-properties-of-primes.md).

## Primes

This is a list of consecutive primes within a given range.

## Interval

A range of numbers between n and m.

The individual numbers contained within the range is not important, only the n and m as markers for the beginning and the end of the range.

It is not required for an interval to contain primes, but primes need to be attached to an interval, even if that interval only contains that prime and nothing more.

If multiple intervals come in touch with each other or overlap based on their beginning and end, then they need to be combined into a single interval.

There should be no gaps between intervals and all primes inside should be discovered.

### Creating an interval from a single number

An interval's minimum range is 1 number, so it that can be created from picking any number outside of the base. It is required, that before creating the interval from that number, it's primality check should be done. That number may fall into one of the following 3 categories:

* prime
* not prime, odd
* not prime, even

Using primality filters, the beginnings and ends of intervals may be extended without doing any additional primality tests.

The most powerful primality filter, which only requires one number is the check, which states, that all primes bigger, than `5` end with either `1`, `3`, `7` or `9`. Since we cover all numbers, which are an exception to this rule (`2`, `3` and `5`) as the default low primes in the base, we can state, that we will not encounter any possible exceptions among the new intervals.

With this rule, we can extend the previous 3 categories by listing all cases of them based on their last digit:

* prime -> can only end with `1`, `3`, `7` or `9`
* not prime, odd -> can only end with `5`
* not prime, even -> can only end with `0`, `2`, `4`, `6` or `8`

Based on their endings, it is possible to mark some numbers before and after our checked number as definite non-primes:

```
 last digit | range      | size
------------+------------+------
 0          | [N]        | 1
 1          | [N-1..N+1] | 3
 2          | [N]        | 1
 3          | [N-1..N+3] | 5
 4          | [N..N+2]   | 3
 5          | [N-1..N+1] | 3
 6          | [N-2..N]   | 3
 7          | [N-3..N+1] | 5
 8          | [N]        | 1
 9          | [N-1..N+1] | 3
```

```
 range      | size | last digits
------------+------+-------------
 [N]        | 1    | 0, 2, 8
 [N-1..N+1] | 3    | 1, 5, 9
 [N..N+2]   | 3    | 4
 [N-2..N]   | 3    | 6
 [N-1..N+3] | 5    | 3
 [N-3..N+1] | 5    | 7
```

## Base

A special case of intervals, which always has it's starting point at `0`.

This gives home to all the lower primes, which tells us how far we can check the primality of numbers without having to find new primes.

It contains a few low primes necessary to cover the exceptions of simple primality filters. For example a powerful filter for primality is to check, if the number ends with `1`, `3`, `7` or `9`, but that only works for primes above `5`. This means, that by default, the base should cover all numbers less or equal to `5`. Other primality filteres might set this minimum to a higher number in the future as we find new filters. This would make sure, that the primality filters would have one less checks to do, because we guarantee, that the number we give would not fall into the range of exceptions.

## Gap

The unchecked area between two intervals.

The priority for filling up gaps should always go for the lowest gap. This would guarantee, that

* the base grows
* it is always the simpler numbers, which get calculated before the difficult ones

---

```json
{
  "base": {
    "end": 125,
    "primes": [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113]
  },
  "intervals": {
    "150..152": {
      "primes": [151]
    }
  }
}
```
