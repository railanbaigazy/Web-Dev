a = int(input())
ans = ''

for i in range(1, a + 1):
    if (a % i == 0):
        ans += str(i) + ' '

print(ans)