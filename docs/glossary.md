# Glossary

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

## Base

A special case of intervals, which always has it's starting point at 0.

This gives home to all the lower primes, which tells us how far we can check the primality of numbers without having to find new primes.

It contains a few low primes necessary to cover the exceptions of simple primality filters. For example a powerful filter for primality is to check, if the number ends with 1, 3, 7 or 9, but that only works for primes above `5`. Other primality filteres might set this minimum to a higher number in the future. This would make sure, that the primality filters would have one less checks to do, because we guarantee, that the number we give would not fall into the range of exceptions.

## Gap

The unchecked area between two intervals.

The priority for filling up gaps should always go for the lowest gap. This would guarantee, that

* the base grows
* it is always the simpler numbers, which get calculated before the difficult ones

