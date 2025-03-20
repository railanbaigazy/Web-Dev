import math

a = int(input())
b = int(input())

ans = ''

for i in range(a, b + 1):
    if (math.sqrt(i) % 1 == 0):
        ans += str(i) + ' '
        
print(ans)