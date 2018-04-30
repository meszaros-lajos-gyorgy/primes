# Parallel calculations

## Numbers, that have the same integer square root

See [Divisors and multipliers](./divisors-and-multipliers.md#all-possible-squares-for-a-given-divisor-reverse-isqrt) for info on this

## Aborting a primality check

When checking a prime candidate, the process can take a long time, but the client might exit before finishing the calculation. For this, it is required to store the last checked divisor as additional information next to the number itself.

```json
{
  "number": 127,
  "lastChecked": 27
}
```

When clients requests new calculations, then the priority should be on the aborted calculations compared to starting new calculations on new numbers.

## Checking a single number with multiple clients

The primality check for a given number `N` can be distributed between `M` number of clients. First, the primes in the [base](./building-blocks#base) need to be sorted into `M` groups in a way, that the 1st group gets all the `kM+1`-th primes, the 2nd group gets all the `kM+2`-th primes, and repeat this until the last group gets all the `kM+(M-1)` = `(k+1)M-1`-th primes. All clients do their calculation from the lower numbers to the highest and when they are finished - either because of running out of primes to check or a divisor have been found - they reply back to the server. When the server gets a response from any of the clients, that a divisor have been found, it broadcasts the instruction to all clients to stop calculating the number. Then the clients may ask for another task from the server.

### Open questions about this topic

TODO

* how many primes should the server have before needing to break up primal checks to multiple clients?
* at what steps does the server need to split the task into `2`, `3`, `4` or any other number?
