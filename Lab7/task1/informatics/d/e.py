def hasDuplicate(arr):
    for i in range(1, len(arr)):
        if arr[i] == arr[i-1]:
            return True
    return False

n = int(input())
arr = list(map(int, input().split()))
print('YES' if hasDuplicate(arr) else 'NO')