n = int(input())
arr = input().split()
ans = ''

for i in range(n):
    if i % 2 == 0:
        ans += arr[i] + ' '
        
print(ans)