# Divisibility rules and facts

* 0 can be divided with everything
* a number is divisible by 2, if it's even, thus when it's last digit is 0, 2, 4, 6 or 8
* divisibility by 3 can be checked by:
  1. counting how many times 2, 5 and 8 occurs
  2. counting how many times 1, 4 and 7 occurs
  3. subtracting the occurance of 2-5-8 from the occurance of 1-4-7
  4. if the number we get is divisible by 3, then too the original number is
* divisibility of 5 can be checked for a number by checking, if it's last digit is 0 or 5

There is a general, recursive pattern for checking primes from 7 and above:

1. get the last digit off from the number N, which we want to check, if divisible by P prime
2. multiply that last digit by a given number (see [divisibility rules for the first 1000 primes](../docs/divisibility-rules-for-the-first-1000-primes.pdf) for the multiplier)
3. add the result to what remained from number N
4. the result should be checked, if it is divisible by P
5. if the result is still too big, then repeat the process by substituting number N with our result from step 3

Note: the smallest results can be checked with a lookup table.

When checking primality: the largest possible divisor of number N is isqrt(N), where isqrt is the integer part of square root. So divisors of N only need to be checked between 2 and isqrt(N).
(See [http://www.nuprl.org/MathLibrary/integer_sqrt/](http://www.nuprl.org/MathLibrary/integer_sqrt/) on how to implement one)
