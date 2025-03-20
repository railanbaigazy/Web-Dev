def power(a, n):
    if n == 0:
        return 1
    res = a
    for _ in range(1, n):
        res *= a
    return res

inp = list(map(int, input().split()))
print(power(inp[0], inp[1]))