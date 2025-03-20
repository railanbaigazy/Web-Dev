n = int(input())
arr = list(map(int, input().split()))
ans = ''

for i in range(n):
    if arr[i] % 2 == 0:
        ans += str(arr[i]) + ' '
        
print(ans)