if __name__ == '__main__':
    n = int(input())
    arr = map(int, input().split())
    ans = sorted(list(set(arr)), reverse=True)
    print(ans[1])
