def minDivisor(n):
    i = 2
    while i <= n:
        if (n % i == 0):
            return i
        i += 1
    return n

a = int(input())

print(minDivisor(a))