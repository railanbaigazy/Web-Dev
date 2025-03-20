def min(*args):
    minNum = float('inf')
    for _, num in enumerate(args):
        if num < minNum:
            minNum = num
    return minNum

arr = list(map(int, input().split()))
print(min(*arr))