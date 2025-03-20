import math

n = int(input())
i = 1

while (i < n):
    if (math.log2(i) % 1 == 0):
        print(i)
    i += 1