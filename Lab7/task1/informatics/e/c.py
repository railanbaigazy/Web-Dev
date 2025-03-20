def xor(a, b):
    return (a or b) and not (a and b)

inp = list(map(int, input().split()))
print(1 if xor(inp[0], inp[1]) else 0)