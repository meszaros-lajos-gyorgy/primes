# Divisibility

When factorizing an integer into it's prime factors we need to do a lot of division. We check the remainder of certain possible divisor candidates, and if it returns 0, then that number is a divisor of our original number.

This requires a lot of division, but there might be shortcuts, which only require addition or subtraction. These shortcuts are called divisibility rules.

## Note on recursion

Some of the divisibility checking methods are recursive, but obviously the goal would be to find a single operation, which does all the checking in one go.

## Divisibility rules

### 2

* ends with 0, 2, 4, 6 or 8

### 3

* check if the sum of all digits can be divided with 3
* count the occurance of the digits 2, 5 and 8, then do the same for 1, 4 and 7. Subtract the 2-5-8 sum from the 1-4-7 sum and check, if the result is divisible by 3

### 5

* ends with 0 or 5
