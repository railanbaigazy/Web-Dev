if __name__ == '__main__':
    N = int(input())
    arr = []
    
    command_dict = {
        'append': lambda x: arr.append(int(x)),
        'insert': lambda i, x: arr.insert(int(i), int(x)),
        'remove': lambda x: arr.remove(int(x)),
        'pop': lambda: arr.pop(),
        'reverse': lambda: arr.reverse(),
        'sort': lambda: arr.sort(),
        'print': lambda: print(arr),
    }

    for i in range(N):
        command = input().split()
        cmd = command[0]
        args = command[1:]
        if cmd in command_dict:
            command_dict[cmd](*args)