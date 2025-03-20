def minDivisor(n):
    for i in range(2, n + 1):
        if (n % i == 0):
            return i
    return n

a = int(input())

print(minDivisor(a))