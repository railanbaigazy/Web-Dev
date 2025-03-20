import math

n = int(input())

if (math.log2(n) % 1 == 0):
    print("YES")
else:
    print("NO")