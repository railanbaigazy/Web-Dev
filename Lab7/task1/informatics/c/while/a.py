import math

n = int(input())
i = 1

while (i < n):
    if (math.sqrt(i) % 1 == 0):
        print(i)
    i += 1